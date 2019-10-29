const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidG9ueW5ndXllbjIwMSIsImEiOiJjazI5YzJ6dGgxbGpkM2R0Y2p6aDZhczc3In0.Oi4S4qTHLf7tHY2AUoQMWA&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search term.', undefined)
    } else {
      const [longitude, latitude] = body.features[0].center;
      const location = body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location
      });
    }
  });
};


module.exports = geocode;