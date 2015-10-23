// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = require("./models/index");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.render("splash");
});

app.get('/dispatch', function(req, res) {
  res.render("dispatch");
});

app.get('/courier', function(req, res) {
	db.Job.find({}, function (err, jobs) {
		if (err) console.log(err);
		res.render('courier', { jobs: jobs });
	});
});

app.post('/api/jobs', function (req, res) {
	db.Job.create(req.body, function (err, job) {
		res.status(200).json(job);
		if (err) {
			console.log(err);
		}else {
			console.log(job);
			res.json(job);
		}	
	});
});

app.post('/riders', function (req, res) {
  Rider.createSecure(req.body.email, req.body.password, function (err, rider) {
    res.json(rider);
  });
});

    app.listen(process.env.PORT || 5000);
    console.log('server is running');


// var Job = require('./models/job.js');
// var Rider = require('./models/rider.js');

// var jobs = [{ name: 'Johnny Cakes', address: '1850 Fulton St. #9', phone_number: 2012139855, order_time: '11:07PM', delivery_contents: 'large pepperoni pizza', delivery_fee: '$3.00', delivery_tip: '$5.00', cash: true},
// 			{ name: 'John Donson', address: '1200 Fulton St. #9', phone_number: 4158605098, order_time: '11:07PM', delivery_contents: 'cheese steak', delivery_fee: '$3.00', delivery_tip: '$5.00', cash: false},
// 			{ name: 'James Cakes', address: '1850 Atalays St.', phone_number: 2012139855, order_time: '1:30PM', delivery_contents: 'tacos', delivery_fee: '$3.00', delivery_tip: '$5.00', cash: true}];

// app.get('/jobs', function (req, res) {
// 	res.json(jobs);
// });



// app.get('/api/jobs', function(req, res) {
// 	res.json(jobs);
// });

// app.get('/', function(req, res) {
//   res.send("Hellow World!");
// });

// app.listen(3000, function() {
//   console.log("express-heroku-starter is running on port 3000");
// });

