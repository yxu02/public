const request = require('request');

const keys = require('../config/keys');
const url = 'http://api.openweathermap.org/data/2.5/weather?';

module.exports.findTemp = (results, callback)=> {
  const lat = results.lat;
  const lon = results.lng;
  const urlString = url + `lat=${lat}&lon=${lon}&appid=` + keys.weatherAPIKey;
  console.log(urlString);
  request({url: urlString, json: true}, (error, response, body) => {
    if (!error && response.statusCode===200) {
      callback(undefined, body.main.temp);
    } else {
      callback(JSON.stringify(error, undefined, 2), undefined);
    }
  });
}
