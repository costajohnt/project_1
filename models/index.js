var mongoose = require("mongoose");

mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/project_1" );

// After creating a new model, require and export it:
// module.exports.Tweet = require("./tweet.js");

module.exports.Job = require('./job.js');
module.exports.Rider = require('./rider.js');
