import IndexController from '../controllers/index.controller';
import { AbstractRoute } from '@kopf02/express-utils';

class IndexRoute extends AbstractRoute {
  //public readonly path = '/';
  private indexController: IndexController;

  initializeRoutes() {
    this.indexController = new IndexController();
    this.router.get(`/`, this.indexController.index);
    this.router.get(`/version`, this.indexController.version);
    this.router.get(`/health`, this.indexController.healthCheck);
  }

  //public readonly path: string = "12";
  get path() {
    return '/';
  }
}

export default IndexRoute;
