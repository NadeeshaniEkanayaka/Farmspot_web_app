const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FeedBack = sequelize.define('Feedback', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },

    message: {
        type: DataTypes.STRING,
      },
  });

  return FeedBack;
};
