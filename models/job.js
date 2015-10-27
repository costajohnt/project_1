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
		type: Number, 
		required: true
	},
	
	order_contents: [{
		type: String,
		 required: true
	}],
	delivery_fee: {
		type: Number, 
		required: true
	},
	delivery_tip: Number,
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
	}
});

var Job = mongoose.model('Job', JobSchema);

module.exports = Job;

//figure out how to reference the job schema to the rider schema
