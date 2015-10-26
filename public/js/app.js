$(document).ready(function(){

//CREATE NEW JOB ON THE DISPATCH PAGE
  $('#newJob').on('submit', function (e) {
	e.preventDefault();
	var formData = $(this).serialize();

	$.ajax({
		url: '/api/jobs',
		type: "POST",
		data: formData
	})
	.done(function(data) {
		console.log("successfully created a new job", data);
		$('#newJob')[0].reset();
	})
	.fail(function(data) {
		console.log("failed to create new job");
	});
  });

//CREATE A NEW RIDER ON THE SPLASH PAGE now on the signup page wont work
  $('#signUp').on('submit', function (e) {
	e.preventDefault();
	var rider = $(this).serialize();
	
	$.post('/api/riders', rider, function (data) {

	})
	.done(function(data) {
		console.log("successfully created a new rider", data);
		window.location.href = '/courier';
	})
	.fail(function(data) {
		console.log("failed to create new rider");
	});
  });

 //USER SIGN IN
 	$('#signIn').on('submit', function (e) {
	e.preventDefault();
	var rider = $(this).serialize();
	console.log(rider);

	$.post('/api/signin', rider, function (data) {

	})
	.success(function(data) {
		console.log('logged in', data);
		window.location.href = '/courier';
	})
	.error(function(data) {
		console.log(data.responseText);
	});
  });

 //LOGOUT FROM SESSION
 	$('#logOut').click(function(e) {
 		e.preventDefault();

 		$.get('/logout', function(data) {
 			console.log(data.msg);
 			window.location.href = '/signin';
 		});
 	});

//MOVE A JOB FROM THE QUEUE TO MY JOBS
  $('#jobs-list').on('click', '.claim', function (e) {
	e.preventDefault();
	var job = $(this).parents('li');
	$('.myjobs').append(job);
	$(job).find('.claim').text('complete').removeClass('claim').addClass('complete');
});

//MOVE A JOB FROM MYJOBS TO MYCOMPLETEDJOBS
  $('#jobs-list').on('click', '.complete', function (e) {
	e.preventDefault();
	var job = $(this).parents('li');
	$('.mycompletedjobs').append(job);
	});
});

// $(data._id).find('complete')
// $('span[data-id=' + data._id + ']')
// var jobHtml = "<li class='job list-group-item'>" + data.name + data.address + data.phone + data.order_time + data.order_contents + data.delivery_fee + data.delivery_tip + data.riders + "<span data-id='" + data._id + "' class='close delete'>X</span></li>";
// $('.jobs').prepend(jobHtml);
 