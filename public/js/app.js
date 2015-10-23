// CLIENT-SIDE JAVASCRIPT
// On page load
$(document).ready(function(){
  console.log('Hey, Earth!');

  $('#newJob').on('submit', function (e) {
  	e.preventDefault();
  	console.log(this);
  	var formData = $(this).serialize();
  	console.log(formData);

  	$.ajax({
  		url: '/api/jobs',
  		type: "POST",
  		data: formData
  	})
  	.done(function(data) {
  		console.log("successfully created a new job", data);
  		// var jobHtml = "<li class='job list-group-item'>" + data.name + data.address + data.phone + data.order_time + data.order_contents + data.delivery_fee + data.delivery_tip + data.riders + "<span data-id='" + data._id + "' class='close delete'>X</span></li>";
  		// $('.jobs').prepend(jobHtml);
  		$('#newJob')[0].reset();
  	})
  	.fail(function(data) {
  		console.log("failed to create new job");
  	});
  });

  $('.claim').on('click', function (e) {
  	e.preventDefault();
  	var li = $(this).closest('li');
  	$('.myjobs').append(li);
  });

    $('.claim').on('click', function (e) {
    	e.preventDefault();
    	var li = $(this).closest('li');
    	$('.mycompletedjobs').append(li);
    });
});
