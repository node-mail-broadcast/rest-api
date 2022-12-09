import { NextFunction, Request, Response } from 'express';
import { AbstractDefaultController, HTTPResponse } from '@kopf02/express-utils';
import MailServerService from '../services/mailServer.service';
import { IMailServer } from '../entity/mailServer';

class MailServerController extends AbstractDefaultController<
  IMailServer,
  string,
  MailServerService
> {
  parseId(id: string): string {
    return id;
  }
  public get = async (
    req: Request,
    _res: Response<HTTPResponse<IMailServer | IMailServer[] | null>>,
    next: NextFunction
  ) => {
    try {
      this._missingID(req);
    } catch (e) {
      next(e);
    }
  };
  public check() {}
}

export default MailServerController;
