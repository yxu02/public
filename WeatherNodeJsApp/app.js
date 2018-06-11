const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");
const argv = yargs.options({
  a: {
    demand: true,
    alias: "address",
    describe: "Address to fetch weather data",
    string: true
  }
}).argv;

geocode.geocode(argv.a, (error, results)=>{
  if(error){
    console.log(error);
  } else{
    weather.findTemp(results, (error, temp)=>{
      if(error) {
        console.log(error);
      } else{
        console.log(temp)
      }
    });
  }
});
