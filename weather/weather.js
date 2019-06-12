const request = require("request");
const APIKey = require("../config").wetherAPIKey;

const getWeather = (lat, lng, callback) => {
  request(
    {
      uri: `https://api.darksky.net/forecast/${APIKey}/${lat},${lng}`,
      json: true
    },
    (error, response, body) => {
      console.log(body);
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback("Unable to fetch weather");
      }
    }
  );
};

module.exports.getWeather = getWeather;
