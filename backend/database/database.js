const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('technanceDB', 'root', '202399', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: true,
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL using Sequelize');
  })
  .catch(err => {
    console.error('Error connecting to MySQL:', err);
  });

module.exports = sequelize;
