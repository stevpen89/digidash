import React from 'react';
import {connect} from 'react-redux';

function AppTheme (props) {
	
	const {background, themeColor, flavor} = props

	let blue   = '000, 174, 255',
	    yellow = '255, 255, 000',
			red    = '255, 000, 000',
			purple = '140, 000, 255',
			green  = '000, 255, 000',
			orange = '255, 175, 000'

	let theme = (widget, color, strength) => {
		return (`
			.${widget} .theme-text   {color      : rgb(${color})}
			.${widget} .theme-color  {background : rgb(${color})}
			.${widget} .theme-accent {background : rgb(${color})}
			.${widget} .theme-glow   {background : rgb(${color}, ${strength})}
			.${widget} .theme-input  {border     : rgb(${color}) solid; border-width : 0 0 1px 0;}
		`)
	}			

	return (
		<style>
			{`
				#App {
					background      : linear-gradient(to bottom, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.8) 100%), center fixed url(${background});
					background-size : cover;
					min-height      : 100vh;
					transition      : 1s;
				}

				.drawer-background {
					filter          : blur(16px);
					position        : absolute;
					left            : 0;
					top             : 0;
					background      : linear-gradient(to bottom, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.8) 100%), center fixed url(${background});
					background-size : cover;
					width           : 100%;
					min-height      : 100vh;
				}

				.theme-color  {
					color      : white;
					background : rgb(${themeColor});
				}

				.theme-text {color : rgb(${themeColor})}
				
				.theme-input  {
					color        : white;
					background   : transparent;
					border       : solid rgb(${themeColor});
					border-width : 0 0 1px 0;
				}

				.theme-glow {
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					top: 50%;
					border-radius: 50%;
					background-color: rgba(${themeColor},.2);
					z-index: 0;
					filter: blur(100px);
					pointer-events: none;
					z-index: 2;
				}

				.theme-accent {
					position: absolute;
					width: 100%;
					height: 1px;
					left: 0;
					bottom: 0;
					background-color: rgb(${themeColor});
					z-index: 2;
				}

				${flavor === 'modern' ? 
				`
					${theme('search',     blue  , '.35')}
					${theme('clock',      red   , '.15')}
					${theme('weather',    green , '.1 ')}
					${theme('dictionary', purple, '.15')}
					${theme('note',       yellow, '.25')}
					${theme('calculator', orange, '.15')}

					.clock .react-clock__second-hand__body {background-color: rgba(${red})}
				`
				: null}
			`}
		</style>
	)
}

function mapStateToProps (state) {return {background: state.user_bg, themeColor: state.color, flavor : state.flavor}};
export default connect(mapStateToProps)(AppTheme);