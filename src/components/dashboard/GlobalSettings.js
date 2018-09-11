import React, { Component } from 'react'

export default class GlobalSettings extends Component {
	render() {
		return (
			<div className="globalBig">
				
				<div style={{marginBottom: '40px' ,display:"flex", justifyContent:'center',color:"white"}}>
					<h1 style={{color:"white"}}>S E T T I N G S</h1>
				</div>
				
				<div style={{ height: '100%',color:"white",display:"flex", justifyContent: 'space-evenly'}}>
						<div style={{width:"50%", display:"flex", justifyContent: 'center', borderRight:".05px solid white"}}>
							<h4 style={{color:"white"}}>THEMES</h4>
						</div>
						
						<div style={{width:"50%", display:"flex", justifyContent: 'center'}}>
							<h4 style={{color:"white"}}>LAYOUT</h4>
						</div>
				</div>
			
			</div>

		)
	}
}
