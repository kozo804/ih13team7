'use strict';
const mongoose = require('mongoose');
//  mongo 接続情報
const port = "27017";
const database = "testdb";
const conMongo = mongoose.connect(`mongodb://localhost:${port}/${database}`, { useNewUrlParser: true });

module.exports = {
  mongoose: mongoose,
  conMongo: conMongo
};