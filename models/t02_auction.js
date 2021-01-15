'use strict';

const loader = require('./mongoose-loader');
const mongoose = loader.mongoose;

var Schema = mongoose.Schema;

var auctionSchema = new Schema({
	// _id: Number,
	auction_name: String,
	start_time: Number,
	end_time: Number,
	// rep_id: Number,
	car_count: Number,
	car_ids : Object
});

module.exports.Auction = mongoose.model('Auction', auctionSchema);