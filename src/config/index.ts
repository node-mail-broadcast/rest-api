import * as convict from 'convict';
import * as path from 'path';
import * as fs from 'fs';
// Define a schema
const config = convict({
  loglevel: {
    doc: 'The application loglevel.',
    format: String,
    default: 'info',
    env: 'LOGLEVEL',
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port',
  },
  config: {
    doc: 'Location of Config File',
    format: String,
    default: path.join(__dirname, '..', '..', 'config.json'),
    env: 'CONFIG_FILE',
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: String,
      default: 'localhost',
      env: 'DB_HOST',
    },
    port: {
      doc: 'Database host port',
      format: Number,
      default: 3306,
      env: 'DB_PORT',
    },
    database: {
      doc: 'Database name',
      format: String,
      default: '',
      env: 'DB_DB',
    },
    user: {
      doc: 'Database username',
      format: String,
      default: '',
      env: 'DB_USER',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: '',
      env: 'DB_PASSWD',
    },
  },
});

//Load Config json File based on default or Environment Variable
if (fs.existsSync(config.get('config'))) {
  config.loadFile(config.get('config'));
}

//Validate Config Parameter
//
config.validate({ strict: true });
export default config;
