const Plan = require('../models').Plan;
const Member = require('../models').Member;

module.exports = {
  async createPlan(req, res) {
    try {
      const errorContainer = {};
      const planTypes = ['limited', 'unlimited'];

      if (!req.body.name) {
        errorContainer['name'] = 'name is a required field';
      }
      if (req.body.planType && !planTypes.includes(req.body.planType)) {
        errorContainer['planType'] = `${req.body.planType} is not recognized, planType can either be unlimited or limited`;
      }
      if ((req.body.planType === 'limited') && (!req.body.startDate || !req.body.endDate)) {
        errorContainer['dates'] = 'startDate and endDate are required fields';
      }
      if (Date.parse(req.body.startDate) > Date.parse(req.body.endDate)) {
        errorContainer['dateError'] = 'startDate cannot be greater than endDate';
      }
      if(Object.keys(errorContainer).length) {
        return res.status(400).send(errorContainer);
      }

      const plan = await Plan.create({
        name: req.body.name,
        planType: req.body.planType,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      });

      res.status(201).send(plan);
    } catch(error) {
      console.log(error);
      res.status(400).send('A server error occured!');
    }
  },
  async listMembersByPlan(req, res) {
    try {
      const plan = await Plan.findByPk(req.params.planId);

      if (!plan) {
        return res.status(404).send({
          plan: 'This Plan does not exist'
        });
      }
      
      const member = await Member.findAll({
        where: {
          planId: req.params.planId,
        },
      });
      if (!member.length) {
        return res.status(404).send({
          message: 'Members attached to this Plan cannot be found'
        });
      }

      res.status(200).send(member);
    } catch(error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  async addMemberToPlan(req, res) {
    try {
      const errorContainer = {};

      const plan = await Plan.findByPk(req.params.planId);

      if (!plan) {
        errorContainer['planId'] = `member cannot be added to plan. ${req.params.planId} supplied as planId parameter is invalid`;
      }
      if (!req.body.firstName) {
        errorContainer['firstName'] = 'firstName is a required field';
      }
      if (!req.body.lastName) {
        errorContainer['lastName'] = 'lastName is a required field';
      }
      if (!req.body.dob) {
        errorContainer['dob'] = 'dob is a required field';
      }
      if (Object.keys(errorContainer).length) {
        return res.status(400).send(errorContainer);
      }

      const member = await Member.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        planId: req.params.planId,
      });

      res.status(201).send(member);
    } catch(error) {
      console.log(error);
      res.status(400).send('A server error occured!');
    }
  },
}