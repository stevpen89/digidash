const axios      = require('axios');
const Dictionary = require('oxford-dictionary');
const Vibrant    = require('node-vibrant');

require('dotenv').config();
const { REACT_APP_WEATHERKEY, REACT_APP_DICTIONARY_ID, REACT_APP_DICTIONARY_KEY,REACT_APP_PLACES } = process.env

const config = {
	app_id      : REACT_APP_DICTIONARY_ID,
	app_key     : REACT_APP_DICTIONARY_KEY,
	source_lang : 'en'
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

		axios.get(`https://api.darksky.net/forecast/${REACT_APP_WEATHERKEY}/${lat},${lng}`)
			.then(api => { res.status(200).send(api.data) })
	},
	getplaces: (req, res) => {
		const db = req.app.get('db');
		const { lat, lng } = req.body

		axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&keyword=cruise&key=${REACT_APP_PLACES}`)
			.then(api => { res.status(200).send(api.data) })
	},

	vibrant: async (req, res) => {
		const db = req.app.get('db');
		const { image } = req.body

		let swatch = await Vibrant.from(image).getPalette((err, palette) => palette)

		function colorSelect(flavor) {
			if (swatch[flavor]) {
				let r = Math.trunc(swatch[flavor]._rgb[0]);
				let g = Math.trunc(swatch[flavor]._rgb[1]);
				let b = Math.trunc(swatch[flavor]._rgb[2]);
				return `${r}, ${g}, ${b}`
			}
			else { return null }
		}

		let package = {
			vibrant      : colorSelect('Vibrant'),
			muted        : colorSelect('Muted'),
			lightVibrant : colorSelect('LightVibrant'),
			lightMuted   : colorSelect('LightMuted'),
			darkVibrant  : colorSelect('DarkVibrant'),
			darkMuted    : colorSelect('DarkMuted')
		}

		res.status(200).send(package)
	},

	unsplash: async (req, res) => {
		const db = req.app.get('db');
		const { user_id } = req.params
		const { image, color, theme } = req.body

		db.users.user_wallpaper([image, color, theme, user_id])
			.then (user => res.status(200).send(user))
			.catch(err  => console.log(`Error Message: ${err}`))
	},
	getcurency:(req,res,next) =>{  
        const db = req.app.get('db');
        const {val1,val2} = req.body
        //change  location
        console.log(val1)
        // db.getMaster()
        // .then(data=>{
        axios.get(`http://free.currencyconverterapi.com/api/v5/convert?q=${val1}_${val2}&count=2`).then(response=>{

        res.status(200).send(response.data)
        // })
      })}
}
