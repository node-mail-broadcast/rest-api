import 'reflect-metadata';
import { ConnectOptions } from 'mongoose';
import config from '../config';

const authstring =
  config.get('db.user') !== ''
    ? config.get('db.user') + ':' + config.get('db.password') + '@'
    : '';

const mongoDBURL = `mongodb://${authstring}${config.get(
  'db.host'
)}:${config.get('db.port')}/${config.get('db.database')}`;

const mongoOptions: ConnectOptions = {
  authSource: 'admin',
};

export { mongoOptions, mongoDBURL };
