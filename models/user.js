"use strict";

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('user',{
          idx: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
          },
          id: {
            type: DataTypes.STRING(50),
            validate: {
              is: ["^[a-z0-9_-]+$", 'i'],
            },
          },
          pass: {
            type: DataTypes.STRING(200),
          },
          name: {
            type: DataTypes.STRING(50),
            allowNull: true,
          },
          tel: {
            type: DataTypes.STRING(20),
            allowNull: true,
          },
          phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
          },
          email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            validate: {
              isEmail: true,
            },
          },
          birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
              isDate: true,
            },
          },
          reg_date: {
            type: DataTypes.DATEONLY,
            validate: {
              isDate: true
            },
            defaultVlue:DataTypes.now,
          },
          ip: {
            type: DataTypes.STRING(15),
            allowNull: true,
            validate: {
              isIP: true,
            },
          }
        },
        {
          timestamps: false,
          tableName: 'user',
        }
      );
      return User;
    };