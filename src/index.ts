import {
  App,
  Config,
  dbConfig,
  getMongoConnectionString,
  IDbConfig,
  logger,
  rabbitMqConfig,
} from '@kopf02/express-utils';
//Convict config
export type CustomConvictConfig = IDbConfig;
new Config({
  rabbitmq: {
    ...rabbitMqConfig,
    queue: {
      doc: 'The Queue rabbitmq should connect to',
      format: String,
      default: 'emails',
      env: 'RABBIT_QUEUE',
    },
  },
  ...dbConfig('mongodb', 'rest-api'),
});

import MaintenanceMiddleware from './middlewares/maintenance.middleware';
import indexRoute from './routes/index.route';
import * as mongoose from 'mongoose';
import { Mongoose } from 'mongoose';
import mailTemplatesRoute from './routes/mailTemplates.route';
import MailServerRoute from './routes/mailServer.route';

logger.level = 'silly';
const app = new App(
  new indexRoute(),
  new mailTemplatesRoute(),
  new MailServerRoute()
);
let dataSource: Mongoose;

if (process.env.NODE_ENV !== 'test') {
  logger.info('Trying to connect to database...');
  mongoose
    .connect(getMongoConnectionString(), { authSource: 'admin' })
    .then((res) => {
      //AppDataSource.initialize().then((_r) => {
      app.afterMiddlewares(new MaintenanceMiddleware(false).ExpressMiddleWare);
      app.init();
      app.getServer().set('etag', false);
      app.listen(Config.getConfig().get('port'));
      dataSource = res;
    });
  //});
} else {
  //app.afterMiddlewares(new MaintenanceMiddleware().ExpressMiddleWare);
  app.init();
  app.listen(Config.getConfig().get('port'));
}

export { dataSource };
