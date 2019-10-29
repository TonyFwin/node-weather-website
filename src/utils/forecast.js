const request = require('request');

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/d9a279a1c1d34393b0dff29cb218e8aa/${long},${lat}?units=us`;

  request({url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined);
    } else if (body.error){
      callback('Unable to find locaiton.', undefined)
    } else {
      const {summary, temperatureLow, temperatureHigh, windGust} = body.daily.data[0];
      const {temperature, precipProbability, windSpeed, humidity} = body.currently;
      
      callback(undefined, 
        `
          ${summary} It is currently ${Math.round(temperature)}° out. 
          Today's high is ${Math.round(temperatureHigh)}° and today's low is ${Math.round(temperatureLow)}°
          The current humidity is ${Math.round(humidity*100)}%
          There is a ${Math.round(precipProbability*100)}% chance of rain.
          The wind speed is ${Math.round(windSpeed)} mph with gusts up to ${Math.round(windGust)} mph.
        `
        );
    }
  });
}

module.exports = forecast;