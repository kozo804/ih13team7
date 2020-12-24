'use strict';

const loader = require('./mongoose-loader');
const mongoose = loader.mongoose;

var Schema = mongoose.Schema;

var bitSchema = new Schema({
	bit: [{user_id: String, price: String}]
});

exports.bitHistory = mongoose.model('bitHistory', bitSchema);