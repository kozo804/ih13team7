'use strict';

const loader = require('./mongoose-loader');
const mongoose = loader.mongoose;

var Schema = mongoose.Schema;

var bitSchema = new Schema({
	car_id: String,
	user_id: String, 
	user_name: String,
	price: String,
	date: String
});

exports.bitHistory = mongoose.model('bitHistory', bitSchema);