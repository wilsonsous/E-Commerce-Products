const sequelize = require('../config/connection');
const { User } = require('../models');

const productData = require('./productData.json');
const clientData = require('./clientData.json');
const providersData = require('./providersData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // populate products, clients and providers
  
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
