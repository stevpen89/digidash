import React, { Component } from 'react'
import axios from 'axios'

export default class Note extends Component {
	constructor(props){
		super(props)
		this.state={
			selectedColor:'rgba(255,0,0,.5)',
			selectedFont:'',
			selectedFontSize:20,
			selectedFontColor:'rgb(30,30,30)',
			selectedWeight:'initial',
			input:"",
			miniSettings:false,
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
	toggleSettings() {
    const {selectedColor,selectedFontColor,selectedWeight,selectedFontSize,selectedFont,input} = this.state
		this.setState({ miniSettings: !this.state.miniSettings })
		console.log(this.props.o)
    axios.put(`/widget/settings/${this.props.o.master_id}`, {
      o1: selectedColor,
      o2: selectedFontColor,
      o3: selectedWeight,
      o4: selectedFontSize,
      o5: selectedFont,
      o6: input,
    }).then(this.props.updateWidgets())
  }

	render() {
		const {miniSettings} = this.state
		return (
			<div className="standard-widget"style={{height:"100%", width:"100%", backgroundColor:this.state.selectedColor}}>
				<button className="widget-settings-button" onClick={() => this.toggleSettings()}>•••</button>
				<div>{miniSettings ? // TERNARY BEGINS HERE
					<div className="widget-settings" style={{display:"flex", flexDirection:"column", alignItems: 'center'}}>
						<div style={{display:"flex"}}>
							<div style={{backgroundColor:'rgba(255,0,0,.5)', 		margin:"5px", height:'30px',width:'30px', borderRadius:"50%"}} onClick={()=>this.updateColor('rgba(255,0,0,.5)')}>			</div>
							<div style={{backgroundColor:'rgba(0,0,255,.5)', 		margin:"5px", height:'30px',width:'30px', borderRadius:"50%"}} onClick={()=>this.updateColor('rgba(0,0,255,.5)')}>			</div>
							<div style={{backgroundColor:'rgba(0,255,0,.5)', 		margin:"5px", height:'30px',width:'30px', borderRadius:"50%"}} onClick={()=>this.updateColor('rgba(0,255,0,.5)')}>			</div>
							<div style={{backgroundColor:'rgba(255,255,0,.5)', 	margin:"5px", height:'30px',width:'30px', borderRadius:"50%"}} onClick={()=>this.updateColor('rgba(255,255,0,.5)')}>		</div>
							<div style={{backgroundColor:'rgba(128,128,128,.5)',margin:"5px", height:'30px',width:'30px', borderRadius:"50%"}} onClick={()=>this.updateColor('rgba(128,128,128,.5)')}>	</div>
						</div>
						<div style={{display:"flex", margin:"20px"}}>
							<h3 style={{color: 'white'}}>Font: </h3>
							<select onChange={(e)=>this.updateFont(e.target.value)}>
								<option value="montserrat">Default</option>
								<option value="impact">Impact</option>
								<option value="times new roman">Times New Roman</option>
								<option value="courier new">Courier New</option>
								<option value="verdana">Verdana</option>
							</select>
						</div>
						<div style={{display:"flex", margin:"20px"}}>
							<h3 style={{color: 'white'}}>Weight: </h3>
							<button onClick={()=>this.updateWeight()} style={{backgroundColor: 'white'}}>Bold</button>
						</div>
						<div style={{display:"flex", margin:"20px"}}>
							<h3 style={{color: 'white'}}>Font Color: </h3>
							<select onChange={(e)=>this.updateFontColor(e.target.value)}>
								<option value="rgb(30,30,30)">Default</option>
								<option value="green">Green</option>
								<option value="blue">Blue</option>
								<option value="white">White</option>
								<option value="grey">Grey</option>
							</select>
						</div>
						<div style={{display:'flex', margin:"20px"}}>
							<h3>FONT SIZE</h3>
							<button onClick={()=>{this.fontIncrement()}} style={{backgroundColor: 'white'}}>+</button>
							<button onClick={()=>{this.fontDecrement()}} style={{backgroundColor: 'white'}}>-</button>
						</div>
					</div> : //TERNARY SPLITS HERE
					<div style={{ height:'100%',width:'100%'}}>
						<textarea onChange={(e)=>this.handleInput(e.target.value)} style={{
							margin:"40px 0 0 0",
							border:"none",
							height:"260px", 
							width:"100%", 
							color:this.state.selectedFontColor, 
							backgroundColor:"transparent", 
							fontFamily:this.state.selectedFont, 
							fontWeight:this.state.selectedWeight, 
							fontSize:this.state.selectedFontSize}}>
						</textarea>
					</div>} 
				</div> 
				{/* TERNARY ENDS JUST ABOVE HERE */}
			</div>
		)
	}
}

// {miniSettings ?
// 	<div className="widget-settings">
// 		<div className={!this.state.show ? `checkbox checked theme-color` : `checkbox`} onClick={() => { this.toggle() }}>
// 			<i class="fas fa-check"></i>
// 		</div>
// 		<a>Digital</a>
// 	</div> : null
// }