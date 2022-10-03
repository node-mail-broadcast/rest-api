import 'reflect-metadata';
import { ConnectOptions } from 'mongoose';
import { Config } from '@kopf02/express-utils';
import { CustomConvictConfig } from '../index';

const authstring =
  Config.getConfig<CustomConvictConfig>().get('db.user') !== ''
    ? Config.getConfig<CustomConvictConfig>().get('db.user') +
      ':' +
      Config.getConfig<CustomConvictConfig>().get('db.password') +
      '@'
    : '';

const mongoDBURL = `mongodb://${authstring}${Config.getConfig<CustomConvictConfig>().get(
  'db.host'
)}:${Config.getConfig<CustomConvictConfig>().get(
  'db.port'
)}/${Config.getConfig<CustomConvictConfig>().get('db.database')}`;

const mongoOptions: ConnectOptions = {
  authSource: 'admin',
};

export { mongoOptions, mongoDBURL };
