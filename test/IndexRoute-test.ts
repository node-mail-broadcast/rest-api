import IndexRoute from '../src/routes/index.route';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import config from '../src/config';
import { App } from '@kopf02/express-utils';

describe('IndexRoute', () => {
  let app: App;

  before(() => {
    process.env.NODE_ENV = 'test';
    config.set('env', 'test');
    //register plugin
    chai.use(chaiHttp);
    app = new App(new IndexRoute());
    app.init();
  });
  it('should get empty data on / request', () => {
    return chai
      .request(app.getServer())
      .get('/')
      .then((res) => {
        chai.expect(res.body).to.deep.equal({ data: null });
        chai.expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('should get api version', (done) => {
    chai
      .request(app.getServer())
      .get('/version')
      .then((res) => {
        //console.log(res);
        chai.expect(res.body).to.deep.equal({ data: { version: 'v0.0.1' } });
        chai.expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        throw err;
      });
  });

  it('should get healthcheck', () => {
    return chai
      .request(app.getServer())
      .get('/health')
      .then((res) => {
        chai.expect(res.body.data.date).to.be.a('number');
        chai.expect(res.body.data.healthy).to.be.true;
        chai.expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });

  it('should get 404', () => {
    return chai
      .request(app.getServer())
      .get('/path-does-not-exist')
      .then((res) => {
        chai.expect(res.body).to.deep.equal({ error: 'Page not found' });
        chai.expect(res).to.have.status(404);
      })
      .catch((err) => {
        throw err;
      });
  });
});
