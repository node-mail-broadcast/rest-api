import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

describe('Convict Config', () => {
  let config: any;
  before('create test config file', async () => {
    fs.writeFileSync(
      path.join(__dirname, '..', 'config.json'),
      JSON.stringify({ port: 1234, db: { port: 27017 } })
    );
    const { default: _config, loadConfigFile } = await import('../src/config');
    //config = .default;
    config = _config;
    config.set('loglevel', 'silly');
    loadConfigFile();
    //console.log(config, __dirname);
  });

  it('should fetch correct defaults', () => {
    assert.strictEqual(config.get('db.host'), 'localhost');
  });

  it('should fetch correct values from config file', () => {
    assert.strictEqual(config.get('port'), 1234);
  });

  it('should fetch correct values from env file', () => {
    assert.strictEqual(config.get('loglevel'), 'silly');
  });

  after('delete test-config.json file', () => {
    //fs.rmSync(path.join(__dirname, '..', 'test-config.json'));
  });
});
