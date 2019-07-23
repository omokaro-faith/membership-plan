module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATE,
    },
  });

  Member.associate = (models) => {
    Member.belongsTo(models.Plan, {
      foreignKey: 'planId',
      onDelete: 'CASCADE',
    });
  };

  return Member;
};