const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidmlrbWlsbGVyIiwiYSI6ImNrajhhdGcyMDFtZzQyeG52b3R4and3MWoifQ.-xqqZYbOyBIJI4s-NVce9A'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (!body.features.length) {
            callback('Unable to find the location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode