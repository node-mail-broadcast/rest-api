import IndexController from '../controllers/index.controller';
import { AbstractRoute } from '../utils/AbstractRoute';

class IndexRoute extends AbstractRoute {
  public indexController = new IndexController();

  initializeRoutes() {
    this.router.get(`${this.getPath()}`, this.indexController.index);
    this.router.get(`${this.getPath()}version`, this.indexController.version);
    this.router.get(
      `${this.getPath()}health`,
      this.indexController.healthCheck
    );
  }

  public getPath(): string {
    return '/';
  }
}

export default IndexRoute;
