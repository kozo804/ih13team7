'use strict';
const mongoose = require('mongoose');
/* mongo 接続
  port 27017
  database testdb
*/
const conMongo = mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true });


/*
const sequelize = new Sequelize(
  // postgres://username:password@host:port/dbname
  // 'mysql://root:root@node_mysql:3306/testdb'
);
*/

module.exports = {
  mongoose: mongoose,
  conMongo: conMongo
};