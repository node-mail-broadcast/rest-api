import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CustomConvictConfig } from '../index';
import { Config } from '@kopf02/express-utils';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  host: Config.getConfig<CustomConvictConfig>().get('db.host'),
  port: Config.getConfig<CustomConvictConfig>().get('db.port'),
  username: Config.getConfig<CustomConvictConfig>().get('db.user'),
  password: Config.getConfig<CustomConvictConfig>().get('db.password'),
  database: Config.getConfig<CustomConvictConfig>().get('db.database'),
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../entity/*.ts'],
  migrations: [],
  subscribers: [],
});
