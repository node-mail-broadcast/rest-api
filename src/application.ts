import config from './config';

import * as express from 'express';
import * as cors from 'cors';

import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger } from './utils/logger';
import MaintenanceMiddleware from './middlewares/maintenance.middleware';
import { AppDataSource } from './database/data-source';
import { DataSource } from 'typeorm';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(...routes: Routes[]) {
    this.app = express();
    this.port = config.get('port');
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase()
      .then((data) => {
        if (data instanceof DataSource) logger.info('Connected to Database');
        else logger.info('Skipping Database connection (Test Mode)');
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
      })
      .catch(logger.error);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info('=================================');
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info('=================================');
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase(): Promise<DataSource | void> {
    if (this.env !== 'test') {
      logger.info('Trying to connect to database...');
      return AppDataSource.initialize();
    }
    return Promise.resolve();
  }

  private initializeMiddlewares() {
    this.app.disable('x-powered-by');

    this.app.use(express.json());

    this.app.use(cors());

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(new MaintenanceMiddleware().ExpressMiddleWare);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
    this.app.use(function (_req, res, _next) {
      res.status(404).json({ error: 'Page not found' });
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
