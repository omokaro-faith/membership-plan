const Member = require('../models').Member;

module.exports = {
  async createMember(req, res) {
    try {
      const errorContainer = {};

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
  async listMembers(req, res) {
    try {  
      const member = await Member.findAll();
      if (!member.length) {
        return res.status(404).send({
          message: 'Members cannot be found'
        });
      }

      res.status(200).send(member);
    } catch(error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
}
