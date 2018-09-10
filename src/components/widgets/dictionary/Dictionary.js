import React, { Component } from 'react'
import axios from 'axios'
import './Dictionary.css'

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
			<div className="dictionary standard-widget">
				Dictionary
				<input onChange={(e)=>{this.changeHandler(e.target.value)}}/>
				<button onClick={()=>{this.getDefinition()}} className="filled-button theme-color">GO</button>
				{/* <h1 className="theme-text">{JSON.stringify(this.state.results)}</h1> */}
				<div className="theme-glow"></div>
				<div className="theme-accent"></div>
			</div>
		)
	}
}