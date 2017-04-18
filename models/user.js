"use strict";

module.exports = function(sequelize,DataTypes){
  var User = sequelize.define('User',{
    IDX: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ID: {
      type: DataTypes.STRING(50),
    },
    PASS: {
      type: DataTypes.STRING(128),
      allowNull : false,
    },
    NAME: {
      type: DataTypes.STRING(30),
      allowNull : false,
    },
    TEL: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    PHONE: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    EMAIL: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    BIRTH: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    REG_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'USER'
  }
  );
  return User;
};
// const Sequelize = require('sequelize');

// var sequel = require('../model/sequelize.js');
// /* Sequelize 모델정의*/
// var User =sequel.define('User',{
//     IDX: {
//       type: Sequelize.INTEGER,
//       primaryKey: true
//     },
//     ID: {
//       type: Sequelize.STRING(50),
//     },
//     PASS: {
//       type: Sequelize.STRING(128),
//       allowNull : false,
//     },
//     NAME: {
//       type: Sequelize.STRING(30),
//       allowNull : false,
//     },
//     TEL: {
//       type: Sequelize.STRING(13),
//       allowNull: true
//     },
//     PHONE: {
//       type: Sequelize.STRING(13),
//       allowNull: true
//     },
//     EMAIL: {
//       type: Sequelize.STRING(100),
//       allowNull: true
//     },
//     BIRTH: {
//       type: Sequelize.DATEONLY,
//       allowNull: false
//     },
//     REG_DATE: {
//       type: Sequelize.DATEONLY,
//       allowNull: false
//     }
//   }, {
//     timestamps: false,
//     tableName: 'USER'
//   }
// );
// module.exports = User;