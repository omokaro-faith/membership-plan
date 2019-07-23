# membership-plan

Instructions: 
You are building a membership platform with plans. A plan can be unlimited or limited. If limited, the plan must have a start date and an end date. All plans must have a name. A member can be added to a plan. The member must have a first name, last name and date of birth. We should be able to list members by the plan they belong to.

Build a Node REST API to model this and make sure to use any RDBMS of your choice, preferably Postgres.
Ensure your work conforms to the SOLID principles of development, as much as is possible in Javascript.


## Getting Started
To start the API server on your machine:

- Clone this repo.
- Run npm install in the directory you cloned the repo.
- Run export DATABASE_URL='database name'  
- Create a .env file in the root of the directory and add in it details as shown in the .env-sample file

- Run npm start:dev to start the server and access the API on localhost:8000/api/v1/'endpoints'

## Test Setup

1. createdb database_test
2. NODE_ENV=test sequelize db:migrate
Run npm test to run the tests.


## Routes
- app.post('/api/v1/plans', planController.createPlan); Creates a Plan
- app.post('/api/v1/members', memberController.createMember); Creates a Member
- app.get('/api/v1/members', memberController.listMembers); List Members
- app.post('/api/v1/plans/:planId/members', planController.addMemberToPlan); Add members to Plan
- app.get('/api/v1/plans/:planId/members', planController.listMembersByPlan); Get members by Plan