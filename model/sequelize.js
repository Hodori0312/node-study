const Sequelize = require('sequelize');
const db_config  = require('../db-config.json');
/* Sequelize 연결*/
const sequelize = new Sequelize(
  db_config.database,
  db_config.user,
  db_config.password,
  {
    'host' : db_config.host,
    'dialect' : 'mysql'
  }
);
module.exports = sequelize;