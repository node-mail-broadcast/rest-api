import { NextFunction, Request, Response } from 'express';
import { AbstractDefaultController, HTTPResponse } from '@kopf02/express-utils';

class MailServerController<T> extends AbstractDefaultController<T, string> {
  parseId(id: string): string {
    return id;
  }
  public get = async (
    req: Request,
    _res: Response<HTTPResponse<T | T[] | null>>,
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
