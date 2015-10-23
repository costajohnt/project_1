var mongoose = require('mongoose');
	bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var riderSchema = mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	passwordDigest: {
		type: String,
		required: true
	}
});

riderSchema.statics.createSecure = function (name, password, callback) {
  var rider = this;
  bcrypt.genSalt(function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      console.log(hash);
      user.create({
        name: name,
        passwordDigest: hash
      }, callback);
    });
  });
};

var Rider = mongoose.model('Rider', riderSchema);

module.exports = Rider;
