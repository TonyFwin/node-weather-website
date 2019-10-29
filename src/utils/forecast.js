const request = require('request');

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/d9a279a1c1d34393b0dff29cb218e8aa/${long},${lat}?units=us`;

  request({url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined);
    } else if (body.error){
      callback('Unable to find locaiton.', undefined)
    } else {
      const {summary} = body.daily.data[0];
      const {currently} = body;
      const {temperature, precipProbability} = currently;
      
      callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability*100}% chance of rain.`);
    }
  });
}

module.exports = forecast;