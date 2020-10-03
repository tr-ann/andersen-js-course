import { IRoute } from './interfaces/route.interface'
import { errorComponent } from './components/error.component'
import { parseLocation } from './common/parseLocation';
import { IRequest } from './interfaces/request/request.interface';

export class Router {
  private routes: IRoute[];

  constructor(routes: IRoute[]) {
    this.routes = [ ...routes ];
  }

  async navigate() {
    const path = parseLocation();
    await this.renderComponent(path);
  }

  getRequest(path: string, route: IRoute) {
    let [ onlyPath, queries ] = path.split('?');

    let request: IRequest = {
      path: onlyPath,
      params: [],
      queries: [],
    };

    let splitPath = onlyPath.split('/',);

    route.path.split('/').forEach((url, index) => {
      if (url[0] == ':') {
        request.params.push({ key: url.slice(1), value: splitPath[index] });
      }
    });

    if (queries) {
      queries.split('&').forEach(param => {
        let [ key, value ] = param.split('=');
        request.queries.push({ key, value });
      })
    }

    return request;
  }

  async renderComponent(path: string) {

    const route = this.findRoute(path);

    if (route) {
      let req = this.getRequest(path, route);      
      await route.method(req);

      return;
    }

    await errorComponent.render();
    return;
  }

  findRoute(path: string) {
    return this.routes.find(route => route.re.test(path));
  }
}
