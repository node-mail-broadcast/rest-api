import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp = require('chai-http');
import * as mongoose from 'mongoose';
import {
  App,
  Config,
  dbConfig,
  getMongoConnectionString,
  IDbConfig,
} from '@kopf02/express-utils';
import MailServerRoute from '../src/routes/mailServer.route';

let app: App, uuid: string;
//Convict config
export type CustomConvictConfig = IDbConfig;
const u = dbConfig('mongodb', 'rest-api');

//chai.request(app).get('/');
//console.log(app.app);
describe('SMTP Server integration test', () => {
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
        app = new App(new MailServerRoute());
        app.init();
        done();
      })
      .catch((err) => done(err));
  });
  it('should save new entry in db', (done) => {
    chai
      .request(app.getServer())
      .post('/server')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: '1',
        host: 'mail.ni-wa.de',
        username: 'info@blabla.de',
        port: 465,
        password: 'zuthgrbfvedsc',
      })
      .end(function (_err, res) {
        //console.log(res.body, res.status, err);

        expect(res.body).to.have.all.keys('data');
        expect(res.body.data).to.have.all.keys(
          '_id',
          'enabled',
          'name',
          'secure',
          'tags',
          'host',
          'username',
          'port',
          'password',
          'lastEdited',
          'uuid',
          '__v'
        );
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should save second entry in db', (done) => {
    chai
      .request(app.getServer())
      .post('/server')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        name: '1',
        host: 'mail.ni-wa.de',
        username: 'info@blabla.de',
        port: 465,
        password: 'zuthgrbfvedsc',
      })
      .end(function (_err, res) {
        //console.log(res.body, res.status, err);

        expect(res.body).to.have.all.keys('data');
        expect(res.body.data).to.have.all.keys(
          '_id',
          'enabled',
          'name',
          'secure',
          'tags',
          'host',
          'username',
          'port',
          'password',
          'lastEdited',
          'uuid',
          '__v'
        );
        expect(res.status).to.equal(200);
        uuid = res.body.data.uuid;
        console.log('Set UUID', uuid);
        done();
      });
  });
  it('should list one entry', (done) => {
    chai
      .request(app.getServer())
      .get('/server/' + uuid)
      .end(function (_err, res) {
        //console.log(res.body, res.status, err);

        expect(res.body).to.have.all.keys('data');
        expect(res.body.data).to.be.an('object');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should list entries', (done) => {
    chai
      .request(app.getServer())
      .get('/server')
      .end(function (_err, res) {
        //console.log(res.body, res.status, err);

        expect(res.body).to.have.all.keys('data');
        expect(res.body.data).to.be.an('array');
        //expect(res.body.data.length).to.eq(2);
        expect(res.status).to.equal(200);
        done();
      });
  }).timeout(10000);

  it('should update entry', (done) => {
    chai
      .request(app.getServer())
      .patch('/server/' + uuid)
      .send({ name: 'lol4' })
      .end(function (_err, res) {
        //console.log(res.body, res.status, err);

        expect(res.body).to.have.all.keys('data');
        expect(res.body.data.name).to.eq('lol4');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should delete entry', (done) => {
    chai
      .request(app.getServer())
      .delete('/server/' + uuid)
      .end(function (_err, res) {
        expect(res.body).to.have.all.keys('data');
        expect(res.body.data).to.eq(1);
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should throw error on delete non existing entry', (done) => {
    chai
      .request(app.getServer())
      .delete('/server/' + 'blabla')
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
      .delete('/server')
      .end(function (_err, res) {
        expect(res.body).to.deep.equal({ error: 'Missing ID' });
        expect(res.status).to.equal(400);
        done();
      });
  });
  after(() => {
    //app.getServer().listen().close();
    //setTimeout(process.exit, 1000, 0);
  });
});
