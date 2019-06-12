const yargs = require("yargs");

const geoCode = require("./geocode/geocode");
const weather = require("./weather/weather");

const { argv } = yargs
  .options({
    a: {
      demand: true,
      alias: "address",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .alias("help", "h")
  .help();

geoCode.geoCodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);

    weather.getWeather(
      results.latitude,
      results.longitude,
      (errorMessages, weatherResult) => {
        if (errorMessages) {
          console.log(errorMessage);
        } else {
          console.log(
            `It's currently ${weatherResult.temperature}. It's feel like ${weatherResult.apparentTemperature}`
          );
        }
      }
    );
  }
});
