import { AbstractRoute } from '@kopf02/express-utils';
import MailTemplatesController from '../controllers/mailTemplates.controller';
import { templateSchema } from '../entity/joi/templates.joi';
import MailTemplatesService from '../services/mailTemplates.service';

class MailTemplatesRoute extends AbstractRoute {
  private mailTemplateController: MailTemplatesController;
  initializeRoutes(): void {
    this.mailTemplateController = new MailTemplatesController({
      joi: templateSchema,
      router: this.router,
      service: new MailTemplatesService(),
    });
    this.mailTemplateController.initializeRoutes();
  }

  public get path(): string {
    return '/templates';
  }
}

export default MailTemplatesRoute;
