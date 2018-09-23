/**
 * Responds to any HTTP request.
 *
 * @param {!Object} req HTTP request context.
 * @param {!Object} res HTTP response context.
 */

const AirQuality = require('./lib/air_quality.js')

exports.air_quality = (req, res) => {
	let location = req.query.location || 'lyon'
	let responseFormat = req.query.format || 'text'

	let air = new AirQuality(location)

	air.getReport(responseFormat).then((response) => {
		switch (responseFormat) {
	      case 'json':
	        res.json(response)
	      case 'text':
	        res.end(response)
	    }
	}).catch((err) => {
		console.log(err)
	    res.status(500)
	    res.json(JSON.stringify(err))
	})
}
