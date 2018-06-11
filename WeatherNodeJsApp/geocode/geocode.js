const request = require("request");

const geocode = (address, callback) => {
  let url = "http://maps.googleapis.com/maps/api/geocode/json?address=";

  url = url + encodeURIComponent(address);

  console.log(url);

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback(JSON.stringify(error, undefined, 2), undefined);
    } else if (body) {
      callback(undefined, {
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = { geocode };
