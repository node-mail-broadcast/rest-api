import { NextFunction, Request, Response } from 'express';
import IndexService from '../services/IndexService';
import { IHealthCheck, IVersion } from '../interfaces/IndexService.interface';
import { HttpExceptions, HTTPResponse } from '@kopf02/express-utils';
import { sendMailSchema } from '../entity/joi/sendMail';

class IndexController {
  public IndexService = new IndexService();

  public index = (_req: Request, res: Response, next: NextFunction): void => {
    try {
      res.json({ data: null });
    } catch (error) {
      next(error);
    }
  };

  public version = (
    _req: Request,
    res: Response<HTTPResponse<IVersion>>,
    next: NextFunction
  ) => {
    try {
      res.json({ data: this.IndexService.version() });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Return some health information, especial for the docker healthcheck
   * @author Nico
   * @param _req
   * @param res
   * @param _next
   * @version 1
   * @since 11.06.2021 23:12
   */
  public healthCheck = (
    _req: Request,
    res: Response<HTTPResponse<IHealthCheck>>,
    _next: NextFunction
  ) => {
    res.json({ data: this.IndexService.healthCheck() });
  };

  public sendMail = async (
    _req: Request,
    res: Response<HTTPResponse<boolean>>,
    next: NextFunction
  ) => {
    try {
      const validationResult = sendMailSchema
        .tailor('create')
        .validate(_req.body);
      if (validationResult.error)
        throw new HttpExceptions.InputException(validationResult.error.details);
      const result = await this.IndexService.sendMail(_req.body);
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
