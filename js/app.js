var app = new Vue({
	'el': '#app',
	'data': {
		'weather': {},
		'hour': '99',
		'minute': '99',
		'location': 'Current Locaiton',
		'tip': 'If fire, git commit, git push, run for life',
		'temp': '99',
		'lat': '',
		'lon': '',
		'error': '',
		'appid': '4bcccb0e47f16ac96b8707ac00775626',
	}, 
	'methods': {
		getCoordinates: function() {
			return new Promise(function(resolve, reject) {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});
	    },
		fetchWeatherForCurrentLocation: async function()  {
			console.log(this.lat);
			console.log(this.lon);
			const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.appid}&units=metric`);
			this.weather = response.data;
			this.temp = Math.round(this.weather.main.temp);
			this.location = this.weather.name;
		},
		getTime: function () {
			var d = new Date();
			let _hours = d.getHours();
			let _minutes = d.getMinutes();
			this.hour = _hours;
			this.minute = _minutes;
		}
	}, 
	mounted: async function() {
		const position = await this.getCoordinates();
    	this.lat = position.coords.latitude;
    	this.lon = position.coords.longitude;
    	await this.fetchWeatherForCurrentLocation();
	},
	beforeCreate: function () {
	    setInterval(() => {
	      	this.getTime();
	    }, 1000);
	    setInterval(async () => {
	      	await this.getCoordinates();
	      	await this.fetchWeatherForCurrentLocation();
	    }, 1.8e+6);
	  },
});
