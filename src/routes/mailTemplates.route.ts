import { AbstractRoute } from '../utils/AbstractRoute';

class MailTemplatesRoute extends AbstractRoute {
  public initializeRoutes(): void {
    this.router.get(`${this.getPath()}`);
    this.router.put(`${this.getPath()}`);
    this.router.get(`${this.getPath()}:id`);
    this.router.patch(`${this.getPath()}:id`);
    this.router.post(`${this.getPath()}:id`);
    this.router.delete(`${this.getPath()}:id`);
  }

  public getPath(): string {
    return '/templates/';
  }
}

export default MailTemplatesRoute;
