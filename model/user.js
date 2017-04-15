const Sequelize = require('sequelize');

var sequel = require('../model/sequelize.js');
/* Sequelize 모델정의*/
var User =sequel.define('User',{
  code : {
    type:Sequelize.INTEGER,
    primaryKey : true,
    autoIncrement :true,
  },
  id : {
    type:Sequelize.STRING,
    allowNull : false,
  },
  password : {
    type:Sequelize.STRING,
    allowNull : false,
  },
  name : {
    type:Sequelize.CHAR(50),
    allowNull : false,
  },
  tel : {
    type:Sequelize.CHAR(13),
    allowNull : false,
  },
  birthday : {
    type:Sequelize.DATEONLY,
    allowNull : false,
  },
  reg_date : {
    type:Sequelize.DATE,
    allowNull : false,
  },
  ip : {
    type:Sequelize.CHAR(15),
    allowNull : false,
  }},
  {
	  timestamps: false,
	  tableName: 'User'
  }
);
module.exports = User;