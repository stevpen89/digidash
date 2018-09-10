import React, { Component } from 'react'

export default class Note extends Component {
	constructor(){
		super()
		this.state={
			selectedColor:'rgba(255,0,0,.5)',
			selectedFont:'',
			selectedFontSize:20,
			selectedFontColor:'rgb(30,30,30)',
			selectedWeight:'initial',
			input:""
		}
	}

	updateColor(val){
		this.setState({selectedColor:val})
	}

	updateFont(val){
		this.setState({selectedFont:val})
	}

	updateWeight(){
		if(this.state.selectedWeight === 'bold'){this.setState({selectedWeight:'initial'})}
		else if (this.state.selectedWeight === 'initial'){this.setState({selectedWeight:'bold'})}
	}
	updateFontColor(val){
		this.setState({selectedFontColor:val})
	}

	handleInput(val){
		this.setState({input:val})
	}

	fontIncrement(){
		this.setState({selectedFontSize:this.state.selectedFontSize += 6})
	}
	fontDecrement(){
		this.setState({selectedFontSize:this.state.selectedFontSize -= 6})
	}

	render() {
		return (
			<div>
				<div style={{display:"flex"}}>
					<div style={{backgroundColor:'rgba(255,0,0,.5)', 		height:'50px',width:'50px', borderRadius:"25%", border:"2px solid black"}} onClick={()=>this.updateColor('rgba(255,0,0,.5)')}>		</div>
					<div style={{backgroundColor:'rgba(0,0,255,.5)', 		height:'50px',width:'50px', borderRadius:"25%", border:"2px solid black"}} onClick={()=>this.updateColor('rgba(0,0,255,.5)')}>	</div>
					<div style={{backgroundColor:'rgba(0,255,0,.5)', 		height:'50px',width:'50px', borderRadius:"25%", border:"2px solid black"}} onClick={()=>this.updateColor('rgba(0,255,0,.5)')}>	</div>
					<div style={{backgroundColor:'rgba(255,255,0,.5)', 	height:'50px',width:'50px', borderRadius:"25%", border:"2px solid black"}} onClick={()=>this.updateColor('rgba(255,255,0,.5)')}></div>
					<div style={{backgroundColor:'rgba(128,128,128,.5)',height:'50px',width:'50px', borderRadius:"25%", border:"2px solid black"}} onClick={()=>this.updateColor('rgba(128,128,128,.5)')}>	</div>
				</div>
				<div style={{display:"flex"}}>
					<h3>Font: </h3>
					<select onChange={(e)=>this.updateFont(e.target.value)}>
						<option value="montserrat">Default</option>
						<option value="impact">Impact</option>
						<option value="times new roman">Times New Roman</option>
						<option value="courier new">Courier New</option>
						<option value="verdana">Verdana</option>
					</select>
				</div>
				<div style={{display:"flex"}}>
					<h3>Weight: </h3>
					<button onClick={()=>this.updateWeight()}>Bold</button>
				</div>
				<div style={{display:"flex"}}>
					<h3>Font Color: </h3>
					<select onChange={(e)=>this.updateFontColor(e.target.value)}>
						<option value="rgb(30,30,30)">Default</option>
						<option value="green">Green</option>
						<option value="blue">Blue</option>
						<option value="white">White</option>
						<option value="grey">Grey</option>
					</select>
				</div>
				<div>FONT SIZE
					<button onClick={()=>{this.fontIncrement()}}>| + |</button>
					<button onClick={()=>{this.fontDecrement()}}>| - |</button>
				</div>
				<div style={{ height:'400px',width:'400px'}}>
					<textarea onChange={(e)=>this.handleInput(e.target.value)} style={{
						height:"100%", 
						width:"100%", 
						color:this.state.selectedFontColor, 
						backgroundColor:this.state.selectedColor, 
						fontFamily:this.state.selectedFont, 
						fontWeight:this.state.selectedWeight, 
						fontSize:this.state.selectedFontSize}}>
					</textarea>
				</div>
			</div>
		)
	}
}
