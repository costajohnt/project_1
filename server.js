// SERVER-SIDE JAVASCRIPT

// REQUIREMENTS //
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = require("./models/index");
var session = require('express-session');
var cookieparser = require('cookie-parser');

//Middleware
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(cookieparser());

app.use(session({
	saveUninitialized: true,
	resave: true, 
	secret: 'SuperSecretCookie',
	cookie: { maxAge: 600000 }
}));

//ROUTES!!!ROUTES!!!!ROUTES!!!!!ROUTES!!!!
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
		res.render('courier', { jobs: jobs, userid: req.session.riderId, userCookie: req.cookies.riderId });
	});
});

//CREATE A NEW RIDER SIGNUP
app.post('/api/riders', function (req, res) {
	var rider = req.body;
    db.Rider.createSecure(rider.name, rider.password, function (err, rider) {
      req.session.riderId = rider._id;	
      req.session.rider = rider;
      res.cookie('riderId', rider._id);
  	  // res.json({ rider: rider, msg: "Rider created successfully" });
  	  if (err) {
  		  console.log(err);
  	  }else {
      	res.json(rider);
  	}
  });
});

//SETTING SESSION COOKIE???
app.get('/currentrider', function (req, res) {
  res.json({ rider: req.session.riderId, cookie: req.cookies.riderId });
});

//SIGN IN RIDER
app.post('/api/signin', function (req, res) {
  var rider = req.body;
  db.Rider.authenticate(rider.name, rider.password, function (err, rider) {
    if (err) {
      console.log(err);
      res.send(401, err);
    } else {
      req.session.riderId = rider._id;  
      req.session.rider = rider;
      res.cookie('riderId', rider._id);
      res.json(rider);
    }
  });
});

//LOGOUT RIDER AND TERMINATE SESSION
app.get('/logout', function (req, res) {
	req.session.riderId = null;
  res.clearCookie('riderId', {path: '/'});
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

//DELETE A JOB IN THE QUEUE
app.delete('/api/jobs/:id', function (req, res) {
  db.Job.findById(req.params.id, function(err, job) {
    job.remove();
    res.status(200).json(job);
  });
});

//UPDATE A JOB TO ADD A RIDER 
app.put('/api/jobs/:id', function (req, res) {
  db.Job.findById(req.params.id, function(err, job) {
    // console.log(job);
    job.rider = req.session.riderId;

    console.log('job with rider', job);
    job.save();
    res.json(job);  
  });
});

//UPDATE A JOB TO REMOVE A RIDER WHEN SENT BACK TO THE QUEUE
app.put('/api/jobs/rider/:id', function (req, res) {
  db.Job.findById(req.params.id, function(err, job) {
    job.rider = undefined;
    job.save();
    console.log('job moved to queue', job);
    res.json(job); 
  });
});

//UPDATE A JOB TO BE MARKED AS COMPLETE WHEN SENT TO MYCOMPLETEDJOBS
app.put('/api/jobs/complete/:id', function (req, res) {
  db.Job.findById(req.params.id, function(err, job) {
    job.completed = true;
    job.save();
    console.log('job completed', job);
    res.json(job);
  });
});

//UPDATE A JOB TO BE MARKED AS NOT COMPLETED WHEN RETURNED TO MYJOBS
app.put('/api/jobs/incomplete/:id', function (req, res) {
  db.Job.findById(req.params.id, function(err, job) {
    job.completed = false;
    job.save();
    console.log('job marked as complete is false', job);
    res.json(job);
  });
});

//CLICKING ON THE JOB HREF SENDS THE USER TO A PAGE DISPLAYING ALL THE JOB DATA !!!!WORK ON THIS!!!!
app.get('/fulljob/:id', function (req, res) {
  console.log("hitting show route", req.params.id);
  db.Job.findById(req.params.id, function (err, job) {
    if (err) console.log(err);
    res.render('fulljob', { job: job });
  });
});


// //FIND A JOB BY ITS ID !!!!NOT WORKING!!!!!
// app.get('/api/jobs/:id', function (req, res) {
//   db.Job.findById(req.params.id).exec(function (err, job) {
//     if (err) {
//       res.json(err);
//     } else {
//       res.render('courier', {job: job, userid: req.session.riderId});
//     }
//   });
// });

//DO NOT ALTER BELOW
app.listen(process.env.PORT || 5000);
console.log('server is running');

