import { NextFunction, Request, Response } from 'express';
import MailTemplatesService from '../services/mailTemplates.service';
import { HTTPResponse } from '@kopf02/express-utils';
import { ITemplate } from '../entity/Templates';

class MailTemplatesController {
  private mailTemplatesService = new MailTemplatesService();

  public delete = (_req: Request, _res: Response, _next: NextFunction) => {
    this.mailTemplatesService
      .deleteTemplate(_req.params.id)
      .then((result) => {
        _res.json({ data: result });
      })
      .catch(_next);
  };
  public create = (_req: Request, _res: Response, _next: NextFunction) => {};
  public update = (_req: Request, _res: Response, _next: NextFunction) => {};
  public get = (
    _req: Request,
    _res: Response<HTTPResponse<ITemplate | ITemplate[] | null>>,
    _next: NextFunction
  ) => {
    let dbQuery;
    if (_req.params.id) {
      dbQuery = this.mailTemplatesService.getTemplates(_req.params.id);
    } else {
      dbQuery = this.mailTemplatesService.getTemplates();
    }
    dbQuery
      .then((res) => {
        _res.json({ data: res });
      })
      .catch(_next);
  };
  // public delete = (_req: Request, _res: Response, _next: NextFunction) => {};
}

export default MailTemplatesController;
