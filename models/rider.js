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

// authenticate user (when user logs in)
RiderSchema.statics.authenticate = function (name, password, callback) {
  // find user by name entered at log in
  this.findOne({name: name}, function (err, foundRider) {
    console.log(foundRider);

    // throw error if can't find user
    if (!foundRider) {
      console.log('No user with name ' + name);
      callback("Error: no user found", null);  // better error structures are available, but a string is good enough for now
    // if we found a user, check if password is correct
    } else if (foundRider.checkPassword(password)) {
      callback(null, foundRider);
    } else {
      callback("Error: incorrect password", null);
    }
  });
};

// compare password user enters with hashed password (`passwordDigest`)
RiderSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

var Rider = mongoose.model('Rider', RiderSchema);

module.exports = Rider;
