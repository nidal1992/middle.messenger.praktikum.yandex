import { Block } from '@/lib/core/Block';
import { BlockConstructor } from '@/model/types';
import { render } from '@/lib/utils/render';

export class Route {
  private readonly _pathname: string;
  private readonly _blockClass: BlockConstructor;
  private readonly _props: SimpleMap;
  private readonly _rootSelector: string;
  private _block: Block | null;

  constructor(pathname: string, rootSelector: string, view: BlockConstructor, props: SimpleMap) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._rootSelector = rootSelector;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      render(this._rootSelector, this._block);
      return;
    }

    this._block.show();
  }
}
