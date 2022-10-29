import {
  App,
  Config,
  dbConfig,
  getMongoConnectionString,
  IDbConfig,
} from '@kopf02/express-utils';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import MailTemplatesRoute from '../src/routes/mailTemplates.route';
import mongoose from 'mongoose';

//Convict config
export type CustomConvictConfig = IDbConfig;
const u = dbConfig('mongodb', 'rest-api');

describe('Templates', () => {
  let app: App;

  before((done) => {
    new Config<CustomConvictConfig>(u);
    mongoose
      .connect(getMongoConnectionString(), { authSource: 'admin' })
      .then(() => {
        //register plugin
        chai.use(chaiHttp);
        app = new App(new MailTemplatesRoute());
        app.init();
        done();
      })
      .catch((err) => done(err));
  });
  it('should get empty array on / request', () => {
    return chai
      .request(app.getServer())
      .get('/templates')
      .then((res) => {
        // console.log(res.body);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.data).to.be.an('array');
        chai.expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });
  it('should get empty data on /:id request with no existing id', () => {
    return chai
      .request(app.getServer())
      .get('/templates/no-id')
      .then((res) => {
        // console.log(res.body);
        chai.expect(res.body).to.deep.equal({ data: null });
        chai.expect(res).to.have.status(200);
      })
      .catch((err) => {
        throw err;
      });
  });
  after(mongoose.disconnect);
});
