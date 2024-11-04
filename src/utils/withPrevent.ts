export const withPrevent = (fn: EventListener) => (ev: Event) => {
  ev.preventDefault();
  fn(ev);
};
