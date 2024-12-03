import { Route } from '@/lib/core/Route';
import { BlockConstructor } from '@/model/types';

export class Router {
  private static __instance: Router;
  readonly _rootSelector: string;
  routes: Route[];
  history: History;
  _currentRoute: Route | null;

  constructor(rootSelector: string) {
    if (Router?.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootSelector = rootSelector;

    Router.__instance = this;
  }

  use(pathname: string, block: BlockConstructor) {
    const route = new Route(pathname, this._rootSelector, block, {});

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      console.log(this._currentRoute);
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
