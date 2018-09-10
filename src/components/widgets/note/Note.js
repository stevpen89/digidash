import React, { Component } from 'react'

export default class Note extends Component {
	constructor(){
		super()
		this.state={
			selectedColor:'red',
			selectedFont:'',
			selectedFontSize:'',
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
		console.log(this.state.selectedWeight)
	}
	updateFontColor(val){
		this.setState({selectedFontColor:val})
	}

	handleInput(val){
		this.setState({input:val})
		console.log(this.state.input)
	}

	render() {
		return (
			<div>
				<div>Sticky Note</div>
				<div style={{display:"flex"}}>
					<div style={{backgroundColor:'red', 		height:'50px',width:'50px', borderRadius:"25%", border:"2px solid black"}} onClick={()=>this.updateColor('red')}>		</div>
					<div style={{backgroundColor:'blue', 		height:'50px',width:'50px', borderRadius:"25%", border:"2px solid black"}} onClick={()=>this.updateColor('blue')}>	</div>
					<div style={{backgroundColor:'green', 	height:'50px',width:'50px', borderRadius:"25%", border:"2px solid black"}} onClick={()=>this.updateColor('green')}>	</div>
					<div style={{backgroundColor:'yellow', 	height:'50px',width:'50px', borderRadius:"25%", border:"2px solid black"}} onClick={()=>this.updateColor('yellow')}></div>
					<div style={{backgroundColor:'grey', 		height:'50px',width:'50px', borderRadius:"25%", border:"2px solid black"}} onClick={()=>this.updateColor('grey')}>	</div>
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
				<div style={{ height:'400px',width:'400px'}}>
					<textarea onChange={(e)=>this.handleInput(e.target.value)} style={{height:"100%", width:"100%", color:this.state.selectedFontColor, backgroundColor:this.state.selectedColor, fontFamily:this.state.selectedFont, fontWeight:this.state.selectedWeight}}>
					</textarea>
				</div>
			</div>
		)
	}
}
