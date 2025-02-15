const { Sequelize } = require('sequelize');

const SequelizeInstance = new Sequelize('technancedb', 'root', '202399', {
  host: 'localhost',
  dialect: 'mysql',
});

SequelizeInstance.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = SequelizeInstance;
