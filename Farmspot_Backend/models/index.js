const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const User = require('./user')(sequelize);
const Product = require('./product')(sequelize);
const AdditionalImage = require('./additionalImage')(sequelize);
const FeedBack = require('./feedback')(sequelize);

module.exports = {
  sequelize,
  User,
  Product,
  AdditionalImage,
  FeedBack
};
