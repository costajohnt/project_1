// CLIENT-SIDE JAVASCRIPT
// On page load
$(document).ready(function(){
  console.log('Hey, Earth!');

  $('#newJob').on('submit', function (e) {
  	e.preventDefault();
  	console.log(this);
  	var formData = $(this).serialize();

  	$.ajax({
  		url: '/courier',
  		type: "POST",
  		data: formData
  	})
  	.done(function(data) {
  		console.log("successfully created a new job", data);

  	});
  	$('#newJob')[0].reset();
  });
});