'use strict';

const loader = require('./sequelize-loader');
const mongoose = loader.mongoose;

var Schema = mongoose.Schema;

var auction = new Schema({
	auction_name: String,
	// start_time: 
	// end_time: 
	rep_id: Number,
	vehicle_count: Number
});

var auctionModel = mongoose.model('auction', auction);

module.exports = auctionModel;