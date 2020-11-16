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
var member = new Schema({
  name: String,
  email: String,
  tel: String
});
// 
var memberModel = mongoose.model('member', member);

// module.exports = t01_users;
module.exports = memberModel;