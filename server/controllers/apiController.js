const axios = require('axios')
const Dictionary = require('oxford-dictionary')
require ('dotenv').config();
const {REACT_APP_DICTIONARY_ID, REACT_APP_DICTIONARY_KEY} = process.env;

const config = {
	app_id:REACT_APP_DICTIONARY_ID,
	app_key:REACT_APP_DICTIONARY_KEY,
	source_lang:'en'
}

const dict = new Dictionary(config)



// const headers = {
// 	Accept: 'application/json',
// 	app_id: REACT_APP_DICTIONARY_ID,
// 	app_key: REACT_APP_DICTIONARY_KEY
// };

module.exports = {
  dictionary: (req, res) => {
		let lookup = dict.definitions('waffle').then((res)=>{console.log(res)})
		
	}
}

// module.exports = {
//   dictionary: (req, res) => {
// 		axios.get(`https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${req.body}`, headers)
// 			.then(api => res.status(200).send(api))
// 			.catch(err => console.log(`Error Message: ${err}`))
// 	}
// }

// as this stands, it console logs the response for waffle back from oxford. I just suck at promises and am not getting back to the front end. Yolo, much help #loveyouguys