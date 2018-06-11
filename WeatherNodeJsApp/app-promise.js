const axios = require("axios");
const keys = require("./config/keys");
const yargs = require("yargs");
let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?";
let locUrl = "http://maps.googleapis.com/maps/api/geocode/json?address=";

const argv = yargs.options({
  a: {
    demand: true,
    alias: "address",
    describe: "Address to fetch weather data",
    string: true
  }
}).argv;

const findTemp = async results => {
  const lat = results.lat;
  const lon = results.lon;
  try {
    const response = await axios.get(weatherUrl, {
      params: { lat, lon, appid: keys.weatherAPIKey }
    });
    return response.data.main.temp;
  } catch (e) {
    throw new Error("cannot find temperature data!");
  }
};

const findGeocode = async address => {
  locUrl = locUrl + encodeURIComponent(address);
  try {
    const response = await axios.get(locUrl);

    return {
      lat: response.data.results[0].geometry.location.lat,
      lon: response.data.results[0].geometry.location.lng
    };
  } catch (e) {
    throw new Error("cannot get geo lat and lng data!");
  }
};

// const doWork= async ()=>{
//   const loc = await findGeocode(argv.a);
//   const temp = await findTemp(loc);
//   console.log(`current temperature at ${argv.a} is: ${temp}`);
// }
//
// doWork();

findGeocode(argv.a).then(loc => {
  findTemp(loc).then(temp => {
    console.log(temp);
  });
});
