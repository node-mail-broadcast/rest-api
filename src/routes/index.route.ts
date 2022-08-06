import IndexController from '../controllers/index.controller';
import { AbstractRoute } from '../utils/AbstractRoute';

class IndexRoute extends AbstractRoute {
  public path = '/';
  public indexController = new IndexController();

  initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}version`, this.indexController.version);
    this.router.get(`${this.path}health`, this.indexController.healthCheck);
  }
}

export default IndexRoute;
