import { App } from '@kopf02/express-utils';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import MailTemplatesRoute from '../src/routes/mailTemplates.route';
import mongoose from 'mongoose';
import { mongoDBURL, mongoOptions } from '../src/database/mongodb';

describe('Templates', () => {
  let app: App;

  before((done) => {
    mongoose.connect(mongoDBURL, mongoOptions).then(() => {
      //register plugin
      chai.use(chaiHttp);
      app = new App(new MailTemplatesRoute());
      app.init();
      done();
    });
  });
  it('should get empty array on / request', () => {
    return chai
      .request(app.getServer())
      .get('/templates')
      .then((res) => {
        // console.log(res.body);
        chai.expect(res.body).to.deep.equal({ data: [] });
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
