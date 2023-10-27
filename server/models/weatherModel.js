class Weather {
  constructor(data) {
    this.location = data.location.name;
    this.temperature = data.current.temperature;
    this.description = data.current.weather_descriptions[0];
  }
}

module.exports = Weather;
