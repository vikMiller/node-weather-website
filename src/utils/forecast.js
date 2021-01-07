const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=56f643c18ea4b2acbddd2f0bf03d31ce&query=' + lat + ',' + long

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        }
        else if (body.error) {
            console.log(body.error.info);
            callback(body.error.info, undefined)
        }
        else {
            const current = body.current
            const temperature = current.temperature
            const feelsLike = current.feelslike
            const location = body.location.region
            // console.log('It is currently ' + temperature + ' degress in ' + location + '. It feels like ' + feelsLike + ' degress.')
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + temperature + ' degress in ' + location + '. It feels like ' + feelsLike + ' degress out. The humidity is ' + body.current.humidity)
        }
    })
}

module.exports = forecast