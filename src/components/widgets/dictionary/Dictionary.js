import React, { Component } from 'react'
import axios from 'axios'

export default class Dictionary extends Component {
	constructor(){
		super()
		this.state={
			input:'',
			results:'nuffin back yet bruv'
		}
	}

	changeHandler(val){
		this.setState({input:val})
	}

	getDefinition(){
		axios.post(`/api/dictionary`,{query:this.state.input})
		.then((res)=>{this.setState({results:res.data})})
			// makes an axios call to the dictionary API
			// then updates state "results" to show the returned data
	}

	render() {
		return (
			<div>
				Dictionary
				<input onChange={(e)=>{this.changeHandler(e.target.value)}}/>
				<button onClick={()=>{this.getDefinition()}}>GO</button>
				<h1>{JSON.stringify(this.state.results)}</h1>
			</div>
		)
	}
}

// https://od-api.oxforddictionaries.com:443/api/v1/entries/en/communism
// app_id     88bb1831
// app_key    6005c83d676a675cf2eb25e1573d50ed
