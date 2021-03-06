var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JobSchema = mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	address: {
		type: String, 
		required: true
	},
	phone: {
		type: String, 
		required: true
	},
	
	order_contents: {
		type: String,
		required: true
	},
	order_total: {
		type: String,
		required: true
	},
	delivery_fee: {
		type: String, 
		required: true
	},
	delivery_tip: String,
	cash_payment: {
		type: Boolean, 
		required: false
	},
	rider: {
		type: Schema.Types.ObjectId, 
		ref: 'Rider'
	},
	date: { 
		type: Date, 
		default: Date.now
	},
	available: {
		type: Boolean,
		default: true
	},
	completed: {
		type: Boolean,
		default: false
	}
});

var Job = mongoose.model('Job', JobSchema);

module.exports = Job;

//figure out how to reference the job schema to the rider schema
