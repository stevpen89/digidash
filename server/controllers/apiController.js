const axios = require('axios')
const Dictionary = require('oxford-dictionary')

require('dotenv').config();
const { REACT_APP_DICTIONARY_ID, REACT_APP_DICTIONARY_KEY } = process.env;

const config = {
	app_id: REACT_APP_DICTIONARY_ID,
	app_key: REACT_APP_DICTIONARY_KEY,
	source_lang: 'en'
}

const dict = new Dictionary(config)

module.exports = {
	dictionary: async (req, res) => {
		let lookup = await dict.definitions(req.body.query)
		res.status(200).send(lookup)
	},

	weather: (req, res) => {
		const db = req.app.get('db');
		const { lat, lng } = req.body
		
		axios.get(`https://api.darksky.net/forecast/${process.env.REACT_APP_WEATHERKEY}/${lat},${lng}`)
			.then(api => { res.status(200).send(api.data) })
	}
}