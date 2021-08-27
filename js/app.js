var app = new Vue({
	'el': '#app',
	'data': {
		'weather': {},
		'hour': '99',
		'minute': '99',
		'bgClass': 'base',
		'location': 'Current Locaiton',
		'tip': 'If fire, git commit, git push, run for life',
		'weatherImg': "asset/svg/wind.svg",
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
		fetchWeather: async function()  {
			const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.appid}&units=metric`);
			this.weather = response.data;
			this.temp = Math.round(this.weather.main.temp);
			this.location = this.weather.name;
			let weatherID = this.weather.weather[0].id;
			if(weatherID >= 700 && weatherID <= 800) {
				this.bgClass = 'sunny';
				this.weatherImg = "asset/svg/sunny.svg";
				this.tip = "wear sunscreen! lots of it!";
			} else if (weatherID >= 200 && weatherID < 600) {
				this.bgClass = 'rain';
				this.weatherImg = "asset/svg/rain.svg";
				this.tip = "take an umbrella when you go out";
			} else if (weatherID >= 600 && weatherID < 700) {
				this.bgClass = 'snow';
				this.weatherImg = "asset/svg/snow.svg";
				this.tip = "be sure to wear warm clothes"
			} else if (weatherID > 800 && weatherID < 900) {
				this.bgClass = 'base';
				this.weatherImg = "asset/svg/wind.svg";
				this.tip = "enjoy your day";
			}
		},
		fetchWeatherForCurrentLocation: async function() {
			await this.getCoordinates();
			await this.fetchWeather();
		},
		getTime: function () {
			var d = new Date();
			let _hours = d.getHours();
			let _minutes = d.getMinutes();
			if(_hours < 10) {
				_hours = "0" + _hours.toString();
			}
			this.hour = _hours;
			if(_minutes < 10) {
				_minutes = "0" + _minutes.toString();
			}
			this.minute = _minutes;
		}
	}, 
	mounted: async function() {
		const position = await this.getCoordinates();
    	this.lat = position.coords.latitude;
    	this.lon = position.coords.longitude;
    	await this.fetchWeather();
	},
	beforeCreate: function () {
	    setInterval(() => {
	      	this.getTime();
	    }, 1000);
	    setInterval(async () => {
	      	await this.fetchWeatherForCurrentLocation();
	    }, 1.8e+6);
	  },
});
