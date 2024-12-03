export default class EventBus<
  Events extends Record<string, string>,
  EventsNames extends Events[keyof Events] = Events[keyof Events],
> {
  readonly #listeners = <Record<EventsNames, Set<Function>>>{};

  on<T extends Function>(eventName: EventsNames, callback: T): void {
    if (!this.#listeners[eventName]) {
      this.#listeners[eventName] = new Set();
    }

    this.#listeners[eventName].add(callback);
  }

  off(eventName: EventsNames, callback: Function): void {
    if (!this.#listeners[eventName]) {
      throw new Error(`Events ${String(eventName)} not found`);
    }

    this.#listeners[eventName].delete(callback);
  }

  emit(eventName: EventsNames, ...args: unknown[]): void {
    if (!this.#listeners[eventName]) {
      throw new Error(`Events ${String(eventName)} not found`);
    }

    this.#listeners[eventName].forEach((listener: Function) => listener(...args));
  }
}
