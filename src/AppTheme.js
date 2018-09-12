import React from 'react';
import {connect} from 'react-redux';

function AppTheme (props) {
	const {background, themeColor, flavor} = props
	let blue   = '0, 174, 255',
			purple = '140, 0, 255',
			red    = '255, 0, 0'
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
				}

				.theme-accent {
					position: absolute;
					width: 100%;
					height: 1px;
					left: 0;
					bottom: 0;
					background-color: rgb(${themeColor});
					z-index: 0;
				}

				${flavor === 'modern' ? 
				
				`
					.search .theme-text   {color: rgb(${blue})}
					.search .theme-input  {border: solid rgb(${blue})}
					.search .theme-input  {border: solid rgb(${blue}); border-width : 0 0 1px 0;}
					.search .theme-accent {background: rgba(${blue})}
					.search .theme-glow   {background: rgba(${blue}, .35)}

					.dictionary .theme-text   {color: rgb(${purple})}
					.dictionary .theme-color  {background: rgb(${purple})}
					.dictionary .theme-accent {background: rgba(${purple})}
					.dictionary .theme-glow   {background: rgba(${purple}, .1)}
					.dictionary .theme-input  {border: solid rgb(${purple}); border-width: 0 0 1px 0;}

					.clock .theme-color  {background: rgba(${red})}
					.clock .theme-accent {background: rgba(${red})}
					.clock .theme-glow   {background: rgba(${red}, .08)}
					.clock .react-clock__second-hand__body {background-color: rgba(${red})}

					.weather .theme-accent {background: rgba(${blue})}
					.weather .theme-glow   {background: rgba(${blue}, .1)}
				`

				: null}
			`}
		</style>
	)
}

function mapStateToProps (state) {return {background: state.user_bg, themeColor: state.color, flavor : state.flavor}};
export default connect(mapStateToProps)(AppTheme);