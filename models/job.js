var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var jobSchema = mongoose.Schema({
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
	order_time: {
		type: Date, 
		required: true
	},
	order_contents: [{
		type: String,
		 required: true
	}],//This should work to make it so there can be an array of strings for multiple items in an order but check it in google.
	delivery_fee: {
		type: Number, 
		required: true
	},
	delivery_tip: Number,
	cash_payment: {
		type: Boolean, 
		required: true
	},
	riders: [{
		type: Schema.Types.ObjectId, 
		ref: 'Rider'}]
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job;

//figure out how to reference the job schema to the rider schema
