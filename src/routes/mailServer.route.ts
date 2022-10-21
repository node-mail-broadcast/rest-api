import { AbstractRoute } from '@kopf02/express-utils';
import MailServerController from '../controllers/mailServer.controller';
import { mailServerSchema } from '../entity/joi/mailServers.joi';
import MailServerService from '../services/mailServer.service';
import { IMailServer } from '../entity/mailServer';

class MailServerRoute extends AbstractRoute {
  readonly path: string = '/server/';

  initializeRoutes(): void {
    const controller = new MailServerController<IMailServer, string>({
      joi: mailServerSchema,
      // @ts-ignore
      service: new MailServerService(),
      router: this.router, //if router is given, auto add routes to router
    });
    controller.initializeRoutes();
    this.router.get('/check/:id', controller.check);
  }
}

export default MailServerRoute;
