// CLIENT-SIDE JAVASCRIPT
// On page load
$(document).ready(function(){
  console.log('Hey, Earth!');

  $('#newJob').on('submit', function (e) {
  	e.preventDefault();
  	console.log(this);
  	var formData = $(this).serialize();

  	$.ajax({
  		url: '/api/courier',
  		type: "POST",
  		data: formData
  	})
  	.done(function(data) {
  		console.log("successfully created a new job", data);
  		var jobHtml = "<li class='job list-group-item'>" + job.name + job.address + job.phone + job.order_time + job.order_contents + job.delivery_fee + job.delivery_tip + job.riders + "<span data-id='" + data._id + "' class='close delete'>X</span></li>";
  	});
  	$('#newJob')[0].reset();
  });
});