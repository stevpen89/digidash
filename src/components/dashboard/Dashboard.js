import React, { Component } from 'react'
import ReactGridLayout from 'react-grid-layout';
import Clock from '../widgets/clock/Clock'
import Dictionary from '../widgets/dictionary/Dictionary'
import Note from '../widgets/note/Note'
import Search from '../widgets/search/Search'
import Weather from '../widgets/weather/Weather'
import '../../../node_modules/react-grid-layout/css/styles.css'


export default class Dashboard extends Component {
	render() {
		return (
			<div>
				Ay bruv, this is the Dashboard.
				<ReactGridLayout className="layout" cols={30} rowHeight={20} width={1200} height={300}>
					<div key="1" data-grid={{i: '1', x: 3, y: 5, w: 3, h: 4}}><Clock/></div>
					<div key="2" data-grid={{i: '2', x: 3, y: 5, w: 3, h: 4}}><Dictionary/></div>
					<div key="3" data-grid={{i: '3', x: 3, y: 5, w: 3, h: 4}}><Note/></div>
					<div key="4" data-grid={{i: '4', x: 3, y: 5, w: 3, h: 4}}><Search/></div>
					<div key="5" data-grid={{i: '5', x: 3, y: 5, w: 3, h: 4}}><Weather/></div>
				</ReactGridLayout>
			</div>
		)
	}
}
