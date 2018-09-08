const axios = require('axios')
require ('dotenv').config();
const {REACT_APP_DICTIONARY_ID, REACT_APP_DICTIONARY_KEY} = process.env;

const headers = {
	Accept: 'application/json',
	app_id: REACT_APP_DICTIONARY_ID,
	app_key: REACT_APP_DICTIONARY_KEY
};

module.exports = {
  dictionary: (req, res) => {
		axios.get(`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${req.body}`, headers)
			.then(api => res.status(200).send(api))
			.catch(err => console.log(`Error Message: ${err}`))
	}
}