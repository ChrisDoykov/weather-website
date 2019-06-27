const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ba6898ae27f826712b620456f0f95081/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to reach weather service!', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rainChance: body.currently.precipProbability,
                tempHigh: body.daily.data[0].temperatureHigh,
                tempLow: body.daily.data[0].temperatureLow
            });
        }
    })
}

module.exports = forecast;




