import 'reflect-metadata';
import { DataSource } from 'typeorm';
import config from '../config';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: config.get('db.host'),
  port: config.get('db.port'),
  username: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.database'),
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../entity/*.ts'],
  migrations: [],
  subscribers: [],
});
