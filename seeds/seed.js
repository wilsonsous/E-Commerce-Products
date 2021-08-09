const sequelize = require('../config/connection');
const { User, Product } = require('../models');

const productData = require('./productData.json');
const userData = require('./userData.json');
// const providersData = require('./providersData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // populate products, clients and providers
  
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Product.bulkCreate(productData);

  process.exit(0);
};

seedDatabase();
