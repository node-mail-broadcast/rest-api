import { NextFunction, Request, Response } from 'express';
import MailServerService from '../services/mailServer.service';
import { HTTPResponse } from '@kopf02/express-utils';
import { mailServerSchema } from '../entity/joi/mailServers.joi';
import InputException from '../exceptions/InputException';

class MailServerController {
  private mailService = new MailServerService();
  public get = (
    _req: Request,
    _res: Response<HTTPResponse<any>>,
    _next: NextFunction
  ) => {
    this.mailService
      .getServer(_req.params.id)
      .then((res) => _res.json({ data: res }));
  };
  public delete = (
    _req: Request,
    _res: Response<HTTPResponse<any>>,
    _next: NextFunction
  ) => {
    this.mailService
      .deleteServer(_req.params.id)
      .then((res) => _res.json({ data: res }));
  };
  public post = (_req: Request, _res: Response, _next: NextFunction) => {
    const validationResult = mailServerSchema
      .tailor('create')
      .validate(_req.body);
    if (validationResult.error)
      return _next(new InputException(validationResult.error.details));
    this.mailService
      .createServer(validationResult.value)
      .then((res) => _res.json({ data: res }))
      .catch((err) => _next(new InputException(err)));
  };
  public patch = (_req: Request, _res: Response, _next: NextFunction) => {
    const validationResult = mailServerSchema
      .tailor('update')
      .validate(_req.body);
    if (validationResult.error)
      return _next(new InputException(validationResult.error.details));
    this.mailService
      .updateServer(validationResult.value)
      .then((res) => _res.json({ data: res }))
      .catch((err) => _next(new InputException(err)));
  };
}

export default MailServerController;
