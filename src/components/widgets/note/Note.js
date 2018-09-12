import React, { Component } from 'react'
import axios from 'axios'
import './Note.css'

export default class Note extends Component {
	constructor(props) {
		const { o1, o2, o3, o4, o5, o6 } = props.o
		super(props)
		this.state = {
			selectedColor: o1 ? o1 : 'rgba(255,0,0,.5)',
			selectedFont: o2 ? o2 : '',
			selectedFontColor: o3 ? o3 : 'rgb(30,30,30)',
			input: o4 ? o4 : "",
			miniSettings: false,
		}
	}

	updateColor(val) { this.setState({ selectedColor: val }) }
	updateFont(val) { this.setState({ selectedFont: val }) }
	updateFontColor(val) { this.setState({ selectedFontColor: val }) }
	handleInput(val) {
		this.setState({ input: val })
	}

	toggleSettings() {
		this.setState({ miniSettings: !this.state.miniSettings })
		this.saveData();
	}

	saveData() {
		const { selectedColor, selectedFontColor, selectedFont, input } = this.state
		axios.put(`/widget/settings/${this.props.o.master_id}`, {
			o1: selectedColor,
			o2: selectedFont,
			o3: selectedFontColor,
			o4: input
		}).then(this.props.updateWidgets())
	}

	render() {
		const { miniSettings } = this.state
		return (
			<div className="standard-widget" style={{ height: "100%", width: "100%" }}>
				<button className="widget-settings-button" onClick={() => this.toggleSettings()}>•••</button>

				<div>{miniSettings ?
					<div className="widget-settings" style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
						<div className="widget-settings-item color-picker">
							<div style={{ backgroundColor: 'rgb(255,0,0)' }} onClick={() => this.updateColor('rgba(255,0,0,.5)')}>			</div>
							<div style={{ backgroundColor: 'rgb(0,0,255)' }} onClick={() => this.updateColor('rgba(0,0,255,.5)')}>			</div>
							<div style={{ backgroundColor: 'rgb(0,255,0)' }} onClick={() => this.updateColor('rgba(0,255,0,.5)')}>			</div>
							<div style={{ backgroundColor: 'rgb(255,255,0)' }} onClick={() => this.updateColor('rgba(255,255,0,.5)')}>		</div>
							<div style={{ backgroundColor: 'rgb(128,128,128)' }} onClick={() => this.updateColor('rgba(128,128,128,.5)')}>	</div>
						</div>
						<div className="widget-settings-item">
							<h3>Font: </h3>
							<select onChange={(e) => this.updateFont(e.target.value)}>
								<option value="Noto Sans">Default</option>
								<option value="impact">Impact</option>
								<option value="times new roman">Times New Roman</option>
								<option value="courier new">Courier New</option>
								<option value="verdana">Verdana</option>
							</select>
						</div>
						<div className="widget-settings-item">
							<h3>Font Color: </h3>
							<select onChange={(e) => this.updateFontColor(e.target.value)} selected={this.state.selectedFontColor}>
								<option value="white">Default</option>
								<option value="green">Green</option>
								<option value="white">White</option>
								<option value="grey">Grey</option>
							</select>
						</div>
					</div> : null}

					<div>
						<textarea className="note-area" onBlur={() => this.saveData()} onChange={(e) => this.handleInput(e.target.value)} value={this.state.input} style={{
							color: this.state.selectedFontColor,
							fontFamily: this.state.selectedFont,
							fontWeight: this.state.selectedWeight,
						}} />
					</div>
				</div>
				<div className="theme-glow" style={{ backgroundColor: this.state.selectedColor, opacity: `.15` }}></div>
				<div className="theme-accent" style={{ backgroundColor: this.state.selectedColor }}></div>
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