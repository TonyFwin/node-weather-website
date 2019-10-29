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
      const {currently} = body;
      const {temperature, precipProbability, windSpeed, humidity} = currently;
      
      callback(undefined, 
        `
          ${summary} It is currently ${temperature}° out. 
          Today's high is ${temperatureHigh}° and today's low is ${temperatureLow}°
          The current humidity is ${humidity*100}%
          There is a ${precipProbability*100}% chance of rain.
          The wind speed is ${windSpeed} mph with gusts up to ${windGust} mph.
        `
        );
    }
  });
}

module.exports = forecast;