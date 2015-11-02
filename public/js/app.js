$(document).ready(function(){

	$('.not-logged-in').hide();

	function checkAuth() {
		$.get('/currentrider', function (data) {
			if (data.rider || data.cookie) {
				console.log("worked");
				$('#dropdown-test').children('.logged-in').hide();
				$('.not-logged-in').show();
			}else {
				console.log("didnt worked");
				$('#dropdown-test').children('.logged-in').show();
				$('.not-logged-in').hide();
			}
		});
	}

	checkAuth();
$('.mycompletedjobs .complete').hide();
$('#signIn').validate();
$('#rider-name-sign-up').focus();
$('#rider-name-sign-in').focus();

//CREATE A NEW RIDER 
$('#signUp').on('submit', function (e) {
	e.preventDefault();
	var rider = $(this).serialize();
	if ($('#passWord').val() === $('#confirmPassword').val()) {
		$.post('/api/riders', rider, function (data) {

		})
		.done(function(data) {
			console.log("successfully created a new rider", data);
			$('.not-logged-in').hide();
			window.location.href = '/courier';
		})
		.fail(function(data) {
			console.log("failed to create new rider");
		});
	} else {
	}
});

	checkAuth();

//RIDER SIGN IN
$('#signIn').on('submit', function (e) {
	e.preventDefault();
	var rider = $(this).serialize();
	console.log(rider);

	$.post('/api/signin', rider, function (data) {
	})

	.success(function(data) {
		console.log('logged in', data);
		$('.not-logged-in').hide();

		
		window.location.href = '/courier';
	})
	.error(function(data) {
		console.log(data.responseText);
		alert("sign in failed, wrong username or password");
	});
});

//LOGOUT FROM SESSION
$('#logOut').click(function(e) {
	e.preventDefault();

	$.get('/logout', function(data) {
		console.log(data.msg);
		window.location.href = '/';
	});
});

//CREATE NEW JOB ON THE DISPATCH PAGE
$('#newJob').on('submit', function (e) {
	e.preventDefault();
	var job = $(this).serialize();

	$.ajax({
		url: '/api/jobs',
		type: "POST",
		data: job
	})
	.done(function(data) {
		console.log("successfully created a new job", data);
		$('#newJob')[0].reset();
	})
	.fail(function(data) {
		console.log("failed to create new job");
	});
});

//DELETE A JOB FROM THE QUEUE AND DATABASE


$('#jobs-list').on('click', '.remove', function (e) {
	e.preventDefault();
if (confirm("are you sure you want to delete this job?")) {
	var job = $(this).parents('li');
	var jobId = job.attr('data-id');

	$.ajax({
		url: '/api/jobs/' + jobId,
		type: "DELETE",
	})
	.done(function(result) {
		job.remove();
	})
	.fail(function(data) {
		console.log("failed to delete job");
	});

}else {
}

});

//MOVE A JOB FROM THE QUEUE TO MYJOBS
$('#jobs-list').on('click', '.claim', function (e) {
	e.preventDefault();
	var job = $(this).parents('li');
	console.log($(this).data('id'));

	$.ajax({
		url: '/api/jobs/' + $(this).data('id'),
		type: "PUT",
		data: job
	})
	.done(function(data) {
		console.log("successfully added a rider", data);
		$('.myjobs').append(job);
		$(job).find('.remove').removeClass('remove').addClass('returnToQueue');
		$(job).find('.claim').removeClass('claim').addClass('complete');
	})
	.fail(function(data) {
		console.log("failed to add a rider");
	});
});

//MOVE A JOB FROM MYJOBS BACK TO THE QUEUE
$('#jobs-list').on('click', '.returnToQueue', function (e) {
	e.preventDefault();
	var job = $(this).parents('li');

	$.ajax({
		url: '/api/jobs/rider/' + $(this).data('id'),
		type: "PUT",
		data: job
	})
	.done(function(data) {
		console.log('successfully returned to queue', data);
		$(job).find('.returnToQueue').removeClass('returnToQueue').addClass('remove');
		$(job).find('.complete').removeClass('complete').addClass('claim');
		$('.jobs').append(job);
	})
	.fail(function(data) {
		console.log('failed to return to queue');
	});
});

// MOVE A JOB FROM MYJOBS TO MYCOMPLETEDJOBS
$('#jobs-list').on('click', '.complete', function (e) {
	e.preventDefault();
	var job = $(this).parents('li');

	$.ajax({
		url: '/api/jobs/complete/' + $(this).data('id'),
		type: "PUT",
		data: job
	})
	.done(function(data) {
		console.log("job completed, changed complete to true", data);
		$(job).find('.complete').hide();
		$(job).find('.returnToQueue').removeClass('returnToQueue').addClass('returnToMyJobs');
		$('.mycompletedjobs').append(job);
	})
	.fail(function(data) {
		console.log('failed to compete job');
	});
});

//MOVE A JOB FROM MYCOMPLETEDJOBS BACK TO MYJOBS
$('#jobs-list').on('click', '.returnToMyJobs', function (e) {
	e.preventDefault();

	var job = $(this).parents('li');

	$.ajax({
		url: '/api/jobs/incomplete/' + $(this).data('id'),
		type: "PUT",
		data: job
	})
	.done(function(data) {

		console.log("job sent back to my jobs, complete changed to false", data);
		$(job).find('.returnToMyJobs').removeClass('returnToMyJobs').addClass('returnToQueue');
		$(job).find('.complete').show();
		$('.myjobs').append(job);
	})
	.fail(function(data) {
		console.log('failed to return job to myjobs');
	});
});

// VIEW GOOGLE MAP WITH MARKER AT SELECTED ADDRESS
// $("[id^='ticket']").on('click', function(e){
// 	e.preventDefault();
// 	console.log(this.id);
// 	// window.location.href = '/fulljob';
// });
});


