import { AbstractRoute } from '@kopf02/express-utils';
import MailTemplatesController from '../controllers/mailTemplates.controller';

class MailTemplatesRoute extends AbstractRoute {
  private mailTemplateController: MailTemplatesController;
  initializeRoutes(): void {
    this.mailTemplateController = new MailTemplatesController();
    this.router.get(`/`, this.mailTemplateController.get);
    this.router.put(`/`, this.mailTemplateController.create);
    this.router.get(`/:id`, this.mailTemplateController.get);
    this.router.patch(`/:id`, this.mailTemplateController.update);
    this.router.post(`/:id`, this.mailTemplateController.create);
    this.router.delete(`/:id`, this.mailTemplateController.delete);
  }

  public get path(): string {
    return '/templates';
  }
}

export default MailTemplatesRoute;
