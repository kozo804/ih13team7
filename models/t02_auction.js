'use strict';

const loader = require('./mongoose-loader');
const mongoose = loader.mongoose;

var Schema = mongoose.Schema;

var auctionSchema = new Schema({
	// _id: Number,
	auction_name: String,
	start_time: Date,
	end_time: Date,
	rep_id: Number,
	car_count: Number,
	car_ids : Object
});

module.Auction = mongoose.model('Auction', auctionSchema);