import { AbstractDefaultController } from '@kopf02/express-utils';
import { ITemplate } from '../entity/Templates';
import MailTemplatesService from '../services/mailTemplates.service';

/**
 * @author Nico Wagner
 * @version 1.0.0
 */
class MailTemplatesController extends AbstractDefaultController<
  ITemplate,
  string,
  MailTemplatesService
> {
  parseId(id: string): string {
    return id;
  }
}

export default MailTemplatesController;
