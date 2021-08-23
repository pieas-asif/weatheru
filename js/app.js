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
		fetchWeatherForCurrentLocation: async function()  {
			this.getCurrentPosition();
			var response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ this.lat + "&lon=" + this.lon + "&appid=" + "4bcccb0e47f16ac96b8707ac00775626");
			if (response != null) {
				console.log(response.json());
			}
		}
	} 
});
