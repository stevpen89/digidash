import React, { Component } from 'react'
import './GlobalSettings.css'
import { connect } from 'react-redux'
import { setTheme, setFlavor, setSearch, setCollision, setCompact } from '../../ducks/reducer'
import Bgp from './Bgp'

class GlobalSettings extends Component {
	constructor(props) {
		super(props)
		const { search, compact, collision } = props
		this.state = {
			color: '115, 164, 191',
			bg_image: 'https://images.unsplash.com/photo-1536130371825-ac75012d9b24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c1c97eb0f52f1174d7a8281dd8348828&auto=format&fit=crop&w=1050&q=80',
			search: search,
			compact: compact,
			collision: collision,
			bgPicker: false
		}
	}

	bgPickerToggle() { this.setState({ bgPicker: !this.state.bgPicker }) }

	render() {
		const { setTheme, setFlavor, setSearch, setCollision, setCompact } = this.props
		const { theme, flavor, search, compact, collision, globalOpen, globalToggle } = this.props
		return (
			<div className={globalOpen ? `global-settings-wrapper global-open` : `global-settings-wrapper`}>
				<div className="global-settings">
					{!this.state.bgPicker ?
						<div className="global-options">
							<h1>Settings</h1>
							<div className="global-main">
								<div className="globalThemes">
									<h2 className="globalItem">THEMES</h2>
									<div className="list">
										<div className="listItem">
											<div className={flavor === 'modern' ? `checkbox checked theme-color` : `checkbox`} onClick={() => { setFlavor(flavor === 'modern' ? 'classic' : 'modern') }}>
												<i className="fas fa-check"></i>
											</div>
											<a>Modern</a>
										</div>
										<div className="listItem">
											<div className={theme === 'dark' ? `checkbox checked theme-color` : `checkbox`} onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark') }}>
												<i className="fas fa-check"></i>
											</div>
											<a>Dark Theme</a>
										</div>
										<div className="listItem">
											<button className="filled-button" onClick={() => this.bgPickerToggle()}>Change Background</button>
										</div>
									</div>
								</div>
								<div className="globalLayout">
									<h2 className="globalItem">LAYOUT</h2>
									<div className="list">
										<div className="listItem">
											<div className={search ? `checkbox checked theme-color` : `checkbox`} onClick={() => { setSearch() }}>
												<i className="fas fa-check"></i>
											</div>
											<a>Static Search Bar</a>
										</div>
										<div className="listItem">
											<div className={compact ? `checkbox checked theme-color` : `checkbox`} onClick={() => { setCompact() }}>
												<i className="fas fa-check"></i>
											</div>
											<a>Compact Widgets</a>
										</div>
										<div className="listItem">
											<div className={collision ? `checkbox checked theme-color` : `checkbox`} onClick={() => { setCollision() }}>
												<i className="fas fa-check"></i>
											</div>
											<a>Prevent Widget Collision</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						: <Bgp globalToggle={globalToggle} globalOpen={this.props.globalOpen} />}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { flavor, theme, search, compact, collision } = state
	return { flavor, theme, search, compact, collision }
};
export default connect(mapStateToProps, { setFlavor, setTheme, setSearch, setCollision, setCompact })(GlobalSettings);