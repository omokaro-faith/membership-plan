const planController = require('../controllers').plan;
const memberController = require('../controllers').member;

module.exports = (app) => {
  app.get('/api/v1', (req, res) => res.status(200).send({
    message: 'Welcome! to the membership-plan application',
  }));

  app.post('/api/v1/plans', planController.createPlan);
  app.post('/api/v1/members', memberController.createMember);
  app.get('/api/v1/members', memberController.listMembers);
  app.post('/api/v1/plans/:planId/members', planController.addMemberToPlan);
  app.get('/api/v1/plans/:planId/members', planController.listMembersByPlan);
};
