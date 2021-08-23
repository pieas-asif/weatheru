var app = new Vue({
	'el': '#app',
	'data': {
		'time': '99.99',
		'location': 'Current Locaiton',
		'tip': 'If fire, git commit, git push, run for life',
		'temp': '99',
		'isDay': false,
		'lat': '',
		'lon': '',
		'error': '',
	}, 
	'methods': {
		getCurrentPosition: function() {			
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this.setPosition);
			} else {
				this.error = "Geolocation is not supported."; 	 
			}
		},
		setPosition: function(position) {
			this.lat = position.coords.latitude;
			this.lon = position.coords.longitude;
		},
		fetchWeatherForCurrentLocation: function() {
			this.getCurrentPosition();
			console.log(this.lon);
		}
	} 
});
