'use strict';

const loader = require('./mongoose-loader');
const mongoose = loader.mongoose;

var Schema = mongoose.Schema;
var carSchema = new Schema({
	model: String,
	model_year: String,
	car_name: String,
	registed_model_year: String,
	door: String,
	shape: String,
	car_history: String,
	engine_size: String,
	fuel: String,
	inspection: String,
	mileage: Number,
	outer_color: String,
	color_no: Number,
	inner_color: String,
	undercarriage_number: String,
	mission: String,
	riding_capacity: String,
	NOX: String,
	handle: String,
	air_conditioning: String,
	equipment: String,
	meter_exchange_history: String,
	color_change: String,
	shift_lever: String,
	recycleing_amount: String,
	warranty: Number,
	guide: Number,
	considerations: String,
	sales_point: String,
	entries_field: String,
	in_room_sheet: String,
	auction_desired_price: Number,
	auction_start_price: Number,
	evaluation_point: String,
	interior_point: String,
	exterior_point: String,
	tag: String,
	support_flg: Boolean,
	// ------ 出品に関するカラム ----------
	auction_id: {
		type: Schema.Types.ObjectId,
		ref: 'Auction',
	},
	emp_id: {
		type: Schema.Types.ObjectId,
		ref: 'Employees',
	},
	listing_number: String,
	// ------ 落札に関するカラム ---------
	successful_bid_member_id: {
		type: Schema.Types.ObjectId,
		ref: 'Member'
	},
	hammer_price: Number,
	payment_flg: Number,
	car_delivery_flg: Number,
	// ------ 制約 ---------
	// model: 
	// auction_id:
	// successful_bid_member_id

	// 車両ステータス	String or Number?
	status: String
});

exports.car = mongoose.model('Car', carSchema);