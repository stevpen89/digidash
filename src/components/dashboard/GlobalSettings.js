import React, { Component } from 'react'
import './GlobalSettings.css'
import {connect} from 'react-redux'
import {setTheme, setFlavor, setSearch, setCollision, setCompact} from '../../ducks/reducer'

class GlobalSettings extends Component {
	constructor(props){
		super(props)
		const {search, compact, collision} = props	
		this.state = {
			color         : '115, 164, 191',
			bg_image      : 'https://images.unsplash.com/photo-1536130371825-ac75012d9b24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c1c97eb0f52f1174d7a8281dd8348828&auto=format&fit=crop&w=1050&q=80',
			search        : search,
			compact       : compact,
			collision     : collision,
		}
	}

	render() {
		const {setTheme, setFlavor, setSearch, setCollision, setCompact} = this.props
		const {theme,color,flavor,bg_image,search,compact,collision} = this.props
		console.log(flavor);
		return (
			<div className="globalBig">			
				<div className="globalSmall">
					<h1 className="settings">SETTINGS</h1>
				</div>				
				<div className="globalMain">
					<div className="globalThemes">
						<h2 className="globalItem">THEMES</h2>
						<div className="list">
							<div className="listItem">Modern
								<div className={flavor === 'modern' ? `checkbox checked theme-color` : `checkbox`} onClick={() => {setFlavor(this.props.flavor === 'modern' ? 'classic' : 'modern') }}>
									<i class="fas fa-check"></i>
								</div>
							</div>
							<div className="listItem">Theme for Redux
								<div className={theme === 'dark' ? `checkbox checked theme-color` : `checkbox`} onClick={() => {setTheme(this.props.theme === 'dark' ? 'light' : 'dark') }}>
									<i class="fas fa-check"></i>
								</div>
							</div>
							<div className="listItem">Text Default Color</div>
							<div className="listItem">User Background</div>
						</div>
					</div>					
					<div className="globalLayout">
						<h2 className="globalItem">LAYOUT</h2>
						<div className="list">
							<div className={this.state.search ? `checkbox checked theme-color` : `checkbox`} onClick={() => {setSearch(); this.setState({search: !this.state.search}) }}>
                <i className="fas fa-check"></i>
              </div>
							<div className="listItem">Search Bar Static</div>

							<div className={this.state.compact ? `checkbox checked theme-color` : `checkbox`} onClick={() => {setCompact(); this.setState({compact: !this.state.compact})}}>
                <i className="fas fa-check"></i>
              </div>
							<div className="listItem">Vertical Compact Toggle</div>

							<div className={this.state.collision ? `checkbox checked theme-color` : `checkbox`} onClick={() => {setCollision(); this.setState({collision: !this.state.collision})}}>
                <i className="fas fa-check"></i>
              </div>
							<div className="listItem">Prevent Collision Toggle</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const  { flavor, theme } = state
	return { flavor, theme }
};
export default connect(mapStateToProps, { setFlavor, setTheme, setSearch, setCollision, setCompact })(GlobalSettings);