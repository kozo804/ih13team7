'use strict';
const mongoose = require('mongoose');
const env = require('../.env');

// mongodb://host:port/database
const conMongo = mongoose.connect(
  `mongodb://${env.DBHOST}:${env.DBPORT}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: env.DBUSER,
    pass: env.DBPASS,
    dbName: env.DBNAME
  }
);


module.exports = {
  mongoose: mongoose,
  conMongo: conMongo
};