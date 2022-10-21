import { AbstractDefaultController } from '@kopf02/express-utils';
import { ITemplate } from '../entity/Templates';

/**
 * @author Nico Wagner
 * @version 1.0.0
 */
class MailTemplatesController extends AbstractDefaultController<
  ITemplate,
  string
> {
  parseId(id: string): string {
    return id;
  }
}

export default MailTemplatesController;
