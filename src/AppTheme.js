import React from 'react';
import {connect} from 'react-redux';

function AppTheme (props) {
	const {background, themeColor} = props
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
			`}
		</style>
	)
}

function mapStateToProps (state) {return {background: state.user_bg, themeColor: state.color}};
export default connect(mapStateToProps)(AppTheme);