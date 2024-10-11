const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const AdditionalImage = sequelize.define('AdditionalImage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mainImage: {
      type: DataTypes.STRING,
    },
  });

  return AdditionalImage;
};
