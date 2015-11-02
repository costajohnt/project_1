$(document).ready(function(){
	
	$.get('/api/mapsjobs', function (data) {

		function initMap() {
			var map = new google.maps.Map(document.getElementById('map'), {
				center: {lat: -34.397, lng: 150.644},
				zoom: 13
			});
			
			var geocoder = new google.maps.Geocoder();
			var jobs = data;
			
			for (var i=0; i<jobs.length; i++) {
				function geocodeAddress(geocoder, resultsMap) {
					var address = jobs[i].address;
					geocoder.geocode({'address': address}, function(results, status) {
						if (status === google.maps.GeocoderStatus.OK) {
							resultsMap.setCenter(results[0].geometry.location);
							var marker = new google.maps.Marker({
								map: resultsMap,
								position: results[0].geometry.location
							});
						} else {
							alert('Geocode was not successful for the following reason: ' + status);
						}
					});
				}
				geocodeAddress(geocoder, map);
			}
		}
		initMap();
	});
});
// $('#map-data').html(data[0].address);
	  // document.getElementById('#queue').addEventListener('click', function() {
			  //   geocodeAddress(geocoder, map);
			  // });