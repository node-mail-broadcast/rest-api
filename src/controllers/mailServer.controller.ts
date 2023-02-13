import { AbstractDefaultController, HTTPResponse } from '@kopf02/express-utils';
import MailServerService from '../services/mailServer.service';
import { IMailServer } from '../entity/mailServer';
import { NextFunction, Response, Request } from 'express';

class MailServerController extends AbstractDefaultController<
  IMailServer,
  string,
  MailServerService
> {
  parseId(id: string): string {
    return id;
  }
  protected get = async (
    req: Request,
    res: Response<HTTPResponse<IMailServer | IMailServer[] | null>>,
    next: NextFunction
  ) => {
    try {
      const x = req.params.id
        ? await this.service.getWithTags(this._getId(req), req.query.tags || [])
        : await this.service.listWithTags(req.query.tags);
      res.json({ data: x });
    } catch (e) {
      next(e);
    }
  };
  public check() {}
}

export default MailServerController;
