const supertest = require('supertest');
const expect = require('chai').expect;
const testHelper = require('./testHelper');
const models = require('../server/models');

const app = require('../app');
const request = supertest.agent(app);

const member2 = testHelper.member2;
const member1 = testHelper.member1;
const badMember = testHelper.badMember;

describe('Member Controller', () => {
  beforeAll((done) => {
    models.Plan
      .destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true
      })
      .then((err) => {
        if (!err) {
          models.Member
            .destroy({
              where: {},
              truncate: true,
              cascade: true,
              restartIdentity: true
            }).then((err) => {
              if (!err) {
                models.Plan
                .bulkCreate([
                  testHelper.planType1,
                  testHelper.planType2,
                ]).then(() => {
                  models.Member
                .bulkCreate([
                  testHelper.member2,
                  testHelper.member1,
                  ]).then(() => {
                    done();
                  });
                  done();
                });
              }
            });
        }
    });
  });

  describe('addMember - POST /api/v1/members', () => {
    it('should add member', (done) => {
      request
        .post(`/api/v1/members`)
        .send(member1)
        .set('Accept', 'application/json')
        .end((err, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.firstName).to.equal('Faith');
          expect(response.body.lastName).to.equal('Omokaro');
          done();
        });
    });
    it('should get members', (done) => {
      request
        .get('/api/v1/members')
        .set('Accept', 'application/json')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body[0].firstName).to.equal('Bunmi');
          expect(response.body[0].lastName).to.equal('Ajala');
          done();
        });
    });
    it('should return error when required fields are not provided', (done) => {
      request
        .post('/api/v1/members')
        .send(badMember)
        .set('Accept', 'application/json')
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.have.own.property('firstName', 'firstName is a required field');
          expect(response.body).to.have.own.property('lastName', 'lastName is a required field');
          expect(response.body).to.have.own.property('dob', 'dob is a required field');
          done();
        });
    });
  });
});
