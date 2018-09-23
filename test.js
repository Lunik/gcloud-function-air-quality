const AirQuality = require('./lib/air_quality.js')

let air = new AirQuality('lyon')

air.getReport('text').then(console.log)