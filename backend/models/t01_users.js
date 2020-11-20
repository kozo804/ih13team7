'use strict';

const loader = require('./mongoose-loader');
/*
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
*/
const mongoose = loader.mongoose;
var Schema = mongoose.Schema;
// 取扱データ形式設定
var memberSchema = new Schema({
  // _id: Number,
  name: String,
  email: String,
  tel: String,
  password: String
});

// module.exports = t01_users;
module.exports = mongoose.model('Member', memberSchema);