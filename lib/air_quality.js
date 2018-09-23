const API = require('./api')

module.exports = class AirQuality {
	constructor (ville) {
		this.ville = ville
		this.API = new API()
	}

	getReport (format) {
		return new Promise((resolve, reject) => {
			this.API.getReport(this.ville).then((res) => {
				switch (format) {
					case 'text':
						resolve(this._formatText(res))
						break

					case 'json':
					default:
						resolve(this._formatJSON(res))
						break
				}
			}).catch(reject)
		})
	}

	_formatJSON (response) {
		return {
			indice: response[0],
			pollutionText: response[1],
			veloText: response[2]
		}
	}

	_formatText (response) {
		return `Actuellement, la qualité de l'air est "${response[1]}" avec un indice de ${response[0]}. Recommandation Vélo : ${response[2]}`
	}
}