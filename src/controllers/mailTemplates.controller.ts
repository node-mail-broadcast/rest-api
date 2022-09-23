import { NextFunction, Request, Response } from 'express';
import MailTemplatesService from '../services/mailTemplates.service';

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
  public get = (_req: Request, _res: Response, _next: NextFunction) => {
    console.log(_req);
  };
  // public delete = (_req: Request, _res: Response, _next: NextFunction) => {};
}

export default MailTemplatesController;
