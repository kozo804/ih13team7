'use strict';
const mongoose = require('mongoose');
const env = require('../.env');

// mongodb://host:port/database
const conMongo = mongoose.connect(`mongodb://${env.DBHOST}:${env.DBPORT}/${env.DBNAME}`, { useNewUrlParser: true });


module.exports = {
  mongoose: mongoose,
  conMongo: conMongo
};