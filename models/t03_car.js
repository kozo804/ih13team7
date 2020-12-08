'use strict';

const loader = require('./mongoose-loader');
const mongoose = loader.mongoose;

var Schema = mongoose.Schema;
var carSchema = new Schema({
	maker: String,
	car_name: String,
	grade: String,
	shape: String,
	registed_model_year: String,
	model_year: String,
	inspection: String,
	model: String,
	mission: String,
	fuel: String,
	outer_color: String,
	inner_color: String,
	engine_size: String,
	mileage: Number,
	car_history: String,
	undercarriage_number: String,
	NOX: String,
	owner: String,
	door: String,
	riding_capacity: String,
	handle: String,
	meter_exchange_history: String,
	color_change: String,
	in_room_sheet: String,
	recycleing_amount: Number,
	air_conditioning: String,
	powor_window: String,
	powor_steering: String,
	sunroof: String,
	leather_seet: String,
	airbag: String,
	aliminium_foil: String,
	navigation: String,
	warranty: String,
	guide: String,
	auction_desired_price: String,
	auction_start_price: String,
	evaluation_point: String,
	interior_point: String,
	exterior_point: String,
	considerations: String,
	sales_point: String,
	entries_field: String,
	comment: String,

	// hammer_price: Number,
	payment_flg: { type: Boolean, default: false },
	car_delivery_flg: { type: Boolean, default: false },
	status: { type: Number, default: 0 },
	
	//以下未使用
	// color_no: Number,
	// warranty: Number,
	// considerations: String,
	// sales_point: String,
	// entries_field: String,
	// auction_desired_price: Number,
	// auction_start_price: Number,
	// evaluation_point: String,
	// interior_point: String,
	// exterior_point: String,
	// tag: String,
	// support_flg: Boolean,

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
	// ------ 制約 ---------
	// model: 
	// auction_id:
	// successful_bid_member_id

	// 車両ステータス	String or Number?
});

exports.car = mongoose.model('Car', carSchema);