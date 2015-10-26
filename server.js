// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = require("./models/index");
var session = require('express-session');

//Middleware
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.use(session({
	saveUninitialized: true,
	resave: true, 
	secret: 'SuperSecretCookie',
	cookie: { maxAge: 600000 }
}));

//GET SIGNUP PAGE
app.get('/signup', function (req, res) {
	res.render('signup');
});

//GET SIGNIN PAGE
app.get('/signin', function (req, res) {
	res.render('signin');
});

//GET SPLASH PAGE
app.get('/', function(req, res) {
  res.render("splash");
});

//GET DISPATCH PAGE
app.get('/dispatch', function(req, res) {
  res.render("dispatch");
});

//GET COURIER PAGE 
app.get('/courier', function (req, res) {
	db.Job.find({}, function (err, jobs) {
		if (err) console.log(err);
		res.render('courier', { jobs: jobs });
	});
});

//CREATE A NEW RIDER
app.post('/api/riders', function (req, res) {
	var rider = req.body;
    db.Rider.createSecure(rider.name, rider.password, function (err, rider) {
      req.session.riderId = rider._id;	
      req.session.rider = rider;
  	  // res.json({ rider: rider, msg: "Rider created successfully" });
  	  if (err) {
  		  console.log(err);
  	  }else {
      	res.json(rider);
  	}
  });
});

//SIGN IN RIDER
app.post('/api/signin', function (req, res) {
  var rider = req.body;
  db.Rider.authenticate(rider.name, rider.password, function (err, rider) {
    if (err) {
      console.log(err);
      res.send(401, err)
    } else {
      req.session.riderId = rider._id;  
      req.session.rider = rider;
      res.json(rider);
    }
  });
});

// AUTHENTICATE RIDER
app.post('/sessions', function (req, res) {
  //CALL AUTHENTICATE FUNCTION TO CHECK IF PASSWORD RIDER ENTERED IS CORRECT
  var rider = req.body;
  db.Rider.authenticate(rider.name, rider.password, function (err, loggedInRider) {
    if (err){
      console.log('authentication error: ', err);
      res.status(500).send();
    } else {
      console.log('setting session rider id ', loggedInRider._id);
      req.session.riderId = loggedInRider._id;
      res.redirect('/profile');
    }
  });
});

//LOGOUT RIDER AND TERMINATE SESSION
app.get('/logout', function (req, res) {
	req.session.riderId = null;
	res.json({ msg: "user successfully logged out"});
});


//CREATE A NEW JOB
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

//FIND A JOB BY ITS ID !!!!NOT WORKING!!!!!
app.get('/api/jobs/:id', function (req, res) {
  db.Job.findById(req.params.id).exec(function (err, job) {
    if (err) {
      res.json(err);
    } else {
      res.render('courier', {job: job});
    }
  });
});

//UPDATE A JOB TO ADD A RIDER
app.put('/api/jobs/:id', function (req, res) {
  db.Job.findById(req.params.id);
  job.ride = req.session.riderId;
  job.save();
  res.json(job);
});

    app.listen(process.env.PORT || 5000);
    console.log('server is running');



//create new rider
// app.post('/api/riders', function (req, res) {
// 	db.Rider.create(req.body, function (err, rider) {
// 		res.status(200).json(rider);
// 		if (err) {
// 			console.log(err);
// 		}else {
// 			console.log(job);
// 			res.json(job);	
// 		}
// 	});
// });


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

