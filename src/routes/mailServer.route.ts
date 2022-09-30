import { AbstractRoute } from '@kopf02/express-utils';
import MailServerController from '../controllers/mailServer.controller';

class MailServerRoute extends AbstractRoute {
  readonly path: string = '/server/';

  initializeRoutes(): void {
    const controller = new MailServerController();
    this.router.get('/', controller.get);
    this.router.get('/:id', controller.get);
    this.router.post('/', controller.post);
    this.router.patch('/:id', controller.patch);
    this.router.delete('/:id', controller.delete);
  }
}

export default MailServerRoute;
