'use strict';

const loader = require('./mongoose-loader');
const mongoose = loader.mongoose;
var Schema = mongoose.Schema;
// 取扱データ形式設定
var memberSchema = new Schema({
  name: String,
  email: String,
  tel: String,
  password: String
});
exports.users = mongoose.model('Users', memberSchema);