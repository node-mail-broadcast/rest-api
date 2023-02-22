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
import { expect } from 'chai';
import { templates } from '../src/entity/Templates';

//Convict config
export type CustomConvictConfig = IDbConfig;
const u = dbConfig('mongodb', 'rest-api');

describe('Templates', () => {
  let app: App;

  before((done) => {
    new Config<CustomConvictConfig>(u);
    Config.getConfig().set('db.database', '/rest-api-test');
    Config.getConfig().set('db.user', 'mongoadmin');
    Config.getConfig().set('db.password', 'secret');
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

  //regeion a
  describe('Creating Templates in DB', () => {
    it('should save new entry in db', (done) => {
      chai
        .request(app.getServer())
        .post('/templates')
        .set('content-type', 'application/json')
        .send({
          name: 'x',
          mail: {
            language: 'de_de',
            subject: 'Moin',
            text: 'lol',
            html: '<p>lol</p>',
            from: {
              name: 'x',
              address: 'x',
            },
            default_addresses: {
              to: [],
              cc: [],
              bcc: [],
            },
          },
        })
        .end(function (_err, res) {
          //console.log(res.body, res.status, err);

          expect(res.body).to.have.all.keys('data');
          expect(res.body.data).to.have.all.keys(
            '__v',
            '_id',
            'enabled',
            'lastEdited',
            'mail',
            'name',
            'uuid'
          );
          expect(res.status).to.equal(200);
          done();
        });
    }).timeout(5000);
    after(() => templates.deleteMany({}));
  });
  describe('List Entries', () => {
    before(() => {
      templates.insertMany([
        {
          _id: '63f5b5ecb93ed44c5926e3d0',
          name: 'x',
          enabled: true,
          lastEdited: 1677047276,
          uuid: '0c6731f9-1343-4080-96a3-733e064dc744',
          mail: {
            variables: [],
            html: '<p>lol</p>',
            text: 'lol',
            from: {
              name: 'x',
              address: 'x',
            },
            subject: 'Moin',
            language: 'de_de',
            smtpServerTags: [],
            default_addresses: {
              to: [],
              cc: [],
              bcc: [],
            },
          },
          __v: 0,
        },
        {
          _id: '63f5b5ecb93ed44c5926e3d0',
          name: 'x',
          enabled: true,
          lastEdited: 1677047276,
          uuid: '0c6731f9-0000-0000-1111-733e064dc741',
          mail: {
            variables: [],
            html: '<p>lol</p>',
            text: 'lol',
            from: {
              name: 'x',
              address: 'x',
            },
            subject: 'Moin',
            language: 'de_de',
            smtpServerTags: [],
            default_addresses: {
              to: [],
              cc: [],
              bcc: [],
            },
          },
          __v: 0,
        },
      ]);
    });
    it('should list entries', (done) => {
      chai
        .request(app.getServer())
        .get('/templates')
        .end(function (_err, res) {
          console.log(res.body, res.status, _err);

          expect(res.body).to.have.all.keys('data');
          expect(res.body.data).to.be.an('array');
          //expect(res.body.data.length).to.eq(2);
          expect(res.status).to.equal(200);
          done();
        });
    }).timeout(10000);
    it('should list one entry', (done) => {
      chai
        .request(app.getServer())
        .get('/templates/0c6731f9-1343-4080-96a3-733e064dc744')
        .end(function (_err, res) {
          //console.log(res.body, res.status, err);
          expect(res.body).to.have.all.keys('data');
          expect(res.body.data).to.be.an('object');
          expect(res.status).to.equal(200);
          done();
        });
    });
    after(() => {
      templates.deleteMany({});
    });
  });

  describe('Update Entry', () => {
    before(() => {
      templates.insertMany([
        {
          _id: '63f5b5ecb93ed44c5926e3d0',
          name: 'x',
          enabled: true,
          lastEdited: 1677047276,
          uuid: '0c6731f9-1343-4080-96a3-733e064dc744',
          mail: {
            variables: [],
            html: '<p>lol</p>',
            text: 'lol',
            from: {
              name: 'x',
              address: 'x',
            },
            subject: 'Moin',
            language: 'de_de',
            smtpServerTags: [],
            default_addresses: {
              to: [],
              cc: [],
              bcc: [],
            },
          },
          __v: 0,
        },
      ]);
    });
    it('should update entry', (done) => {
      chai
        .request(app.getServer())
        .patch('/templates/0c6731f9-1343-4080-96a3-733e064dc744')
        .send({ name: 'lol4' })
        .end(function (_err, res) {
          //console.log(res.body, res.status, err);

          expect(res.body).to.have.all.keys('data');
          expect(res.body.data.name).to.eq('lol4');
          expect(res.status).to.equal(200);
          done();
        });
    });
    after(() => templates.deleteMany({}));
  });
  describe('Delete Entry', () => {
    before(() => {
      templates.insertMany([
        {
          _id: '63f5b5ecb93ed44c5926e3d0',
          name: 'x',
          enabled: true,
          lastEdited: 1677047276,
          uuid: '0c6731f9-1343-4080-96a3-733e064dc744',
          mail: {
            variables: [],
            html: '<p>lol</p>',
            text: 'lol',
            from: {
              name: 'x',
              address: 'x',
            },
            subject: 'Moin',
            language: 'de_de',
            smtpServerTags: [],
            default_addresses: {
              to: [],
              cc: [],
              bcc: [],
            },
          },
          __v: 0,
        },
      ]);
    });
    it('should delete entry', (done) => {
      chai
        .request(app.getServer())
        .delete('/templates/0c6731f9-1343-4080-96a3-733e064dc744')
        .end(function (_err, res) {
          expect(res.body).to.have.all.keys('data');
          expect(res.body.data).to.eq(1);
          expect(res.status).to.equal(200);
          done();
        });
    });
    after(() => templates.deleteMany({}));
  });

  it('should throw error on delete non existing entry', (done) => {
    chai
      .request(app.getServer())
      .delete('/templates/' + 'blabla')
      .end(function (_err, res) {
        //console.log(res.body);
        expect(res.body).to.deep.equal({
          data: 0,
        });
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should throw error on delete with missing uuid', (done) => {
    chai
      .request(app.getServer())
      .delete('/templates')
      .end(function (_err, res) {
        //console.log(res.body)
        expect(res.body).to.deep.equal({ error: 'Missing ID' });
        expect(res.status).to.equal(400);
        done();
      });
  });
  //endregion

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
