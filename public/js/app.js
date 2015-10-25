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

//CREATE A NEW RIDER ON THE SPLASH PAGE
  $('#signUp').on('submit', function (e) {
	e.preventDefault();
	console.log('form submitted');
	var rider = $(this).serialize();
	
	$.post('/api/riders', rider, function (data) {

		console.log(data);
	})
	.done(function(data) {
		console.log("successfully created a new rider", data);
	})
	.fail(function(data) {
		console.log("failed to create new rider");
	});
  });

//MOVE A JOB FROM THE QUEUE TO MY JOBS
  $('.claim').on('click', function (e) {
	e.preventDefault();
	var li = $(this).parents('li');
	$('.myjobs').append(li);
	$('span[data-id=' + data._id + ']').text('complete').removeClass('.class').addClass('.complete'); //something is going on with this line.  I'm targeting a line by its specific ID but I need to target any line by any line's specific ID
	});

//MOVE A JOB FROM MYJOBS TO MYCOMPLETEDJOBS
  $('.complete').on('click', function (e) {
	e.preventDefault();
	var li = $(this).parents('li');
	$('.mycompletedjobs').append(li);
	});
});

// $(data._id).find('complete')
// $('span[data-id=' + data._id + ']')
// var jobHtml = "<li class='job list-group-item'>" + data.name + data.address + data.phone + data.order_time + data.order_contents + data.delivery_fee + data.delivery_tip + data.riders + "<span data-id='" + data._id + "' class='close delete'>X</span></li>";
// $('.jobs').prepend(jobHtml);
 