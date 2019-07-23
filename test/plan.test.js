const supertest = require('supertest');
const expect = require('chai').expect;
const testHelper = require('./testHelper');
const models = require('../server/models');

const app = require('../app');
const request = supertest.agent(app);

const planType1 = testHelper.planType1;
const badMember = testHelper.badMember;
const member1 = testHelper.member1;

describe('Plan Controller', () => {
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
                  testHelper.member3,
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

  describe('addPlan - POST /api/v1/plans', () => {
    it('should add Plan', (done) => {
      request
        .post(`/api/v1/plans`)
        .send(planType1)
        .set('Accept', 'application/json')
        .end((err, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.planType).to.equal('limited');
          expect(response.body.name).to.equal('Gold');
          done();
        });
    });
    it('should get members by plan', (done) => {
      request
        .get('/api/v1/plans/1/members')
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
        .post('/api/v1/plans/1/members')
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
    it('should throw error if required fields are not added', (done) => {
      request
        .post('/api/v1/plans/1/members')
        .send(badMember)
        .set('Accept', 'application/json')
        .end((err, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });
    it('should add members to a plan', (done) => {
      request
        .post('/api/v1/plans/1/members')
        .send(member1)
        .set('Accept', 'application/json')
        .end((err, response) => {
          expect(response.status).to.equal(201);
          done();
        });
    });
  });
});
