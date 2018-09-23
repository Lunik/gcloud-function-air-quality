const request = require('request-promise')
const Xray = require('x-ray')

module.exports = class API {
	constructor () {
		this.baseURL = 'https://air.plumelabs.com/fr/live'
		this.xray = new Xray()
	}

	getReport (ville) {
		return this._gatherPage(ville).then((body) => {
			return Promise.all([
				this._parsePollutionIndice(body),
				this._parsePollutionLevel(body),
				this._parseVeloText(body)
			])
		})
	}

	_gatherPage (ville) {
		return request.get(`${this.baseURL}/${ville}`)
	}

	_parsePollutionLevel (body) {
		const selector = '#pollution-level'
		return this.xray(body, selector)
	}

	_parsePollutionIndice (body) {
		const selector = '#current-pi'
		return this.xray(body, selector)
	}

	_parseVeloText (body) {
		const selector = '#activity-text-1'
		return this.xray(body, selector)
	}
}