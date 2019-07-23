module.exports = (sequelize, DataTypes) => {
  const Plan = sequelize.define('Plan', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    planType: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE,
    },
  });

  return Plan;
};
  