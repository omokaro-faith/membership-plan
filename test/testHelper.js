const testHelper = {
  member1: {
    firstName: 'Faith',
    lastName: 'Omokaro',
    dob: '2012-02-04',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  member2: {
    firstName: 'Bunmi',
    lastName: 'Ajala',
    dob: '2012-02-04',
    createdAt: new Date(),
    updatedAt: new Date(),
    planId: 2
  },
  member3: {
    firstName: 'Bunmi',
    lastName: 'Ajala',
    dob: '2012-02-04',
    createdAt: new Date(),
    updatedAt: new Date(),
    planId: 1
  },
  badMember: {
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  planType1: {
    name : 'Gold',
    planType : 'limited',
    startDate: '2019-03-12',
    endDate: '2020-04-01',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  planType2: {
    name : 'Silver',
    planType : 'limited',
    createdAt: new Date(),
    updatedAt: new Date()
  },
};

module.exports = testHelper;