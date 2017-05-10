"use strict";

var fs = require("fs");
var path = require("path");
const Sequelize = require('sequelize');
var env = process.env.NODE_ENV || "development";
var prodConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_TYPE,
  pool: {
    "max": 5,
    "min": 0,
    "idle": 10000
  }
};
var db_config = env == "production" ? prodConfig : require('../db-config.json');;
const sequelize = new Sequelize(
  process.env.DB_NAME || db_config.database,
  process.env.DB_USER || db_config.user,
  process.env.DB_PASSWORD || db_config.password, env == "production" ? prodConfig : db_config,
  {
    'host': process.env.DB_HOST || db_config.host,
    'dialect': 'mysql',
    'dialectOptions': {
        'useUTC': false, //for reading from database
    },
    'timezone': '+09:00', //for writing to database
  }
);
var db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.user.hasMany(db.attendance, {
  foreignKey: 'idx',
  onDelete: 'cascade',
  onUpdate: 'cascade',
  hooks: true
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;