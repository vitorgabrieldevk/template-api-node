const Sequelize = require('sequelize');

if (
  !process.env.DB_NAME
  || !process.env.DB_USERNAME
  || !process.env.DB_HOST
) {
  console.error('Please set MySQL ENV variables');
  process.exit(-1);
}

const db = {};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: process.env.DB_LOGGING !== true ? console.log : false,
    benchmark: true,
    pool: {
      max: process.env.DB_POOL_MAX,
      min: process.env.DB_POOL_MIN,
      idle: process.env.DB_CONNECTION_IDLE,
    },
    operatorsAliases: false, // to supress the deprecation warning
  },
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
