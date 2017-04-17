const Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || "development";

var prodConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_TYPE,
  pool: { "max": 5, "min": 0, "idle": 10000 }
};

var db_config    = env == "production" ? prodConfig : require('../db-config.json');;
/* Sequelize 연결*/
const sequelize = new Sequelize(
  process.env.DB_NAME||db_config.database,
  process.env.DB_USER||db_config.user,
  process.env.DB_PASSWORD || db_config.password, env == "production" ? prodConfig : db_config,
  {
    'host' : process.env.DB_HOST||db_config.host,
    'dialect' : 'mysql'
  }
);
module.exports = sequelize;