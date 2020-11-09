'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Test = loader.database.define(
  't01_users',
  {
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.CHAR,
      allowNull: false
    }
  }
);

module.exports = t01_users;