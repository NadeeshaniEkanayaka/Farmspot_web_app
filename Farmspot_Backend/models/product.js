const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    mainImage: {
      type: DataTypes.STRING,
    },
    pprice: {
      type: DataTypes.FLOAT,
    },
    category: {
        type: DataTypes.STRING
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    product_lat: {
      type: DataTypes.FLOAT,
    },
    product_lng: {
      type: DataTypes.FLOAT,
    },
  });

  return Product;
};
