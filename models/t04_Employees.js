'use strict';

const loader = require('./mongoose-loader');
const mongoose = loader.mongoose;

var Schema = mongoose.Schema;

var employeesSchema = new Schema({
	// _id: Number,
	name: String,
	password: String,

});

// module.Employees = mongoose.model('Employees', employeesSchema);
exports.employees = mongoose.model('Employee', employeesSchema);
// module.exports = {
//   Employee: employeeModel
// };