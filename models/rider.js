var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10);

var RiderSchema = mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	passwordDigest: {
		type: String,
		required: true
	}
});

RiderSchema.statics.createSecure = function (name, password, callback) {

  var rider = this;

  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash);
      rider.create({
        name: name,
        passwordDigest: hash
      }, callback);
    });
  });
};

var Rider = mongoose.model('Rider', RiderSchema);

module.exports = Rider;
