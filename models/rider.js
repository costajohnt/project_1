var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var riderSchema = mongoose.Schema({
	name: {
		type: String, 
		required: true
	}
});

var Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;
