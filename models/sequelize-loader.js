'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  // postgres://username:password@host:port/dbname
  'mysql://root:root@node_mysql:3306/testdb'
);

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};