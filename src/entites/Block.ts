import Handlebars from 'handlebars';
import { v4 as uuid } from 'uuid';
import { shallowEqual } from '@/utils/shallowEqual';

import EventBus from './EventBus';

export abstract class Block<Props extends SimpleMap = SimpleMap> {
  static EVENTS = {
    EVENT_INIT: 'init',
    EVENT_FLOW_CDM: 'flow:component-did-mount',
    EVENT_FLOW_CDU: 'flow:component-did-update',
    EVENT_FLOW_CDUNM: 'flow:component-did-unmount',
    EVENT_FLOW_RENDER: 'flow:component-did-render',
  } as const;

  private readonly _id: string;
  private readonly _props: Props;
  private readonly _children: Record<string, Block>;
  private readonly _lists: Record<string, Array<Block | string>>;
  private _element: HTMLElement;
  private _isUpdated: boolean = false;
  private _events: Record<string, EventListener>;
  private _eventBus: EventBus<typeof Block.EVENTS>;

  constructor(propsAndChildren?: Props) {
    const { children, props, events, lists } = this._parseProps(propsAndChildren || {});

    this._id = uuid();

    this._lists = lists;
    this._events = events;
    this._children = children;
    this._props = this.makePropsProxy<Props>(props);

    this._eventBus = new EventBus();

    this._registerEvents();

    this._eventBus.emit(Block.EVENTS.EVENT_INIT);
  }

  _registerEvents() {
    this._eventBus.on(Block.EVENTS.EVENT_INIT, this._init.bind(this));
    this._eventBus.on(Block.EVENTS.EVENT_FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.EVENT_FLOW_CDUNM, this._componentDidUnmount.bind(this));
    this._eventBus.on(Block.EVENTS.EVENT_FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.EVENT_FLOW_RENDER, this._render.bind(this));
  }

  _init() {
    this._element = this._createDocumentElement('div');
    this._eventBus.emit(Block.EVENTS.EVENT_FLOW_CDM);
  }

  _createDocumentElement(tag: string) {
    const element = document.createElement(tag);

    if (this._props?.withInternalID) {
      element.setAttribute('data-id', this._id);
    }

    return element;
  }

  _render() {
    this._removeEvents();

    // @ts-expect-error-error
    if (import.meta.env.DEV) {
      console.log(`render component ${this.constructor.name.toUpperCase()}`);
    }

    const render = this.render();
    this._element.innerHTML = '';

    if (typeof render === 'string') {
      const block = this.compile(render);
      this._element.append(block);
    } else {
      this._element.append(render);
    }

    this._element = this._element.children[0] as HTMLElement;
    this._addEvents();
  }

  abstract render(): HTMLElement | string;

  _addEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element.addEventListener(eventName, this._events[eventName].bind(this));
    });
  }

  _removeEvents() {
    Object.keys(this._events).forEach((eventName) => {
      this._element.removeEventListener(eventName, this._events[eventName].bind(this));
    });
  }

  _parseProps(propsAndChildren: SimpleMap) {
    const props = <Props>{};
    const lists = <Record<string, Array<Block | string>>>{};
    const children = <Record<string, Block>>{};
    const events = <Record<string, EventListener>>{};

    Object.keys(propsAndChildren).forEach((key) => {
      if (propsAndChildren[key] instanceof Block) {
        children[key] = <Block>propsAndChildren[key];
        return;
      }

      if (Array.isArray(propsAndChildren[key])) {
        lists[key] = <Array<Block | string>>propsAndChildren[key];
        return;
      }

      if (key.startsWith('on')) {
        const eventName = key.slice(2).toLowerCase();
        events[eventName] = propsAndChildren[key] as EventListener;
        return;
      }

      Object.defineProperty(props, key, {
        value: propsAndChildren[key],
        enumerable: true,
        writable: true,
      });
    });

    return {
      lists,
      events,
      props,
      children,
    };
  }

  compile(template: string) {
    const propsAndStubs = <SimpleMap>{ ...this._props };

    const childrenEntries = Object.entries(this._children);
    const listsEntries = Object.entries(this._lists);

    childrenEntries.forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    listsEntries.forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l__${key}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    listsEntries.forEach(([key, list]) => {
      const stub = fragment.content.querySelector(`[data-id="__l__${key}"]`);

      if (!stub) {
        return;
      }

      const listFragment = this._createDocumentElement('template') as HTMLTemplateElement;

      list.forEach((child) => {
        if (child instanceof Block) {
          listFragment.content.append(child.getContent());
        } else {
          listFragment.content.append(child);
        }
      });

      stub.replaceWith(listFragment.content);
    });

    childrenEntries.forEach(([, child]) => {
      const stub = fragment.content.querySelector(`[data-id="${child?._id}"]`);
      if (stub) {
        stub.replaceWith(child?.getContent());
      }
    });

    return fragment.content;
  }

  _componentDidUnmount() {
    this.componentDidUnmount();

    this._eventBus.emit(Block.EVENTS.EVENT_FLOW_RENDER);
  }

  componentDidUnmount() {}

  _componentDidMount() {
    this.componentDidMount();
    this._eventBus.emit(Block.EVENTS.EVENT_FLOW_RENDER);
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.EVENT_FLOW_CDM);
  }

  _componentDidUpdate(oldProps: SimpleMap, newProps: SimpleMap) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);

    if (isReRender) {
      this._eventBus.emit(Block.EVENTS.EVENT_FLOW_CDUNM);
    }
  }

  componentDidUpdate(oldProps: SimpleMap, newProps: SimpleMap) {
    return !shallowEqual(oldProps, newProps);
  }

  setProps(newProps: Partial<Props>) {
    if (!newProps) {
      return;
    }

    const oldProps = { ...this._props };

    const { children, props } = this._parseProps(newProps);

    if (Object.keys(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (this._isUpdated) {
      this._eventBus.emit(Block.EVENTS.EVENT_FLOW_CDU, oldProps, newProps);
      this._isUpdated = false;
    }
  }

  makePropsProxy<PropsType extends SimpleMap>(props: PropsType) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        if (target[prop] === value) {
          return true;
        }
        this._isUpdated = true;
        Object.defineProperty(target, prop, {
          value,
          writable: true,
          enumerable: true,
        });
        return true;
      },
    });
  }

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  getProps() {
    return this._props;
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'hide';
  }
}
