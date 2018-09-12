import React, { Component } from 'react'
import './GlobalSettings.css'

export default class GlobalSettings extends Component {
	render() {
		return (
			<div className="globalBig">
				
				<div className="globalSmall">
					<h1 className="globalItem">S E T T I N G S</h1>
				</div>
				
				<div className="globalMain">
					<div className="globalThemes">
						<h4 className="globalItem">THEMES</h4>
					</div>
					
					<div className="globalLayout">
						<h4 className="globalItem">LAYOUT</h4>
					</div>
				</div>
			</div>

		)
	}
}
