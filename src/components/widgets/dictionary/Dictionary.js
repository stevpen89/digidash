import React, { Component } from 'react'
import axios from 'axios'
import './Dictionary.css'

export default class Dictionary extends Component {
	constructor(){
		super()
		this.state={
			input:'',
			returnedData:''
		}
	}

	changeHandler(val){
		this.setState({input:val})
	}

	keyPress(e) { if (e.keyCode === 13) { document.getElementById('goButton').click() } }


	getDefinition(){
		axios.post(`/api/dictionary`,{query:this.state.input})
		.then((res)=>{this.setState({returnedData:res.data})})

	}

	render() {
		console.log(this.state.returnedData)
		return (
			<div className="dictionary standard-widget">
				<input onChange={(e)=>{this.changeHandler(e.target.value)}} onKeyDown={this.keyPress}/>
				<button onClick={()=>{this.getDefinition()}} id="goButton" className="filled-button theme-color">GO</button>
				<h1 className="theme-text">{this.state.returnedData.results ? this.state.returnedData.results[0].word : ""}:</h1>
				<p>Definition:{this.state.returnedData ? this.state.returnedData.results[0].lexicalEntries.map((val,i) => <div>{i+1} : {val.entries[0].senses[0].definitions}</div>) : "" }</p>
				<div className="theme-glow"></div>
				<div className="theme-accent"></div>
			</div>
		)
	}
}