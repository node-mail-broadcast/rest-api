import MaintenanceMiddleware from './middlewares/maintenance.middleware';
import indexRoute from './routes/index.route';
import { App, logger } from '@kopf02/express-utils';
import * as mongoose from 'mongoose';
import { mongoDBURL, mongoOptions } from './database/mongodb';
import { Mongoose } from 'mongoose';
import mailTemplatesRoute from './routes/mailTemplates.route';

logger.level = 'silly';
const app = new App(new indexRoute(), new mailTemplatesRoute());
let dataSource: Mongoose;

if (process.env.NODE_ENV !== 'test') {
  logger.info('Trying to connect to database...');
  AppDataSource.initialize().then((_r) => {
    app.afterMiddlewares(new MaintenanceMiddleware().ExpressMiddleWare);
    app.listen();
  });
} else {
  //app.afterMiddlewares(new MaintenanceMiddleware().ExpressMiddleWare);
  app.init();
  app.listen();
}

export { dataSource };
