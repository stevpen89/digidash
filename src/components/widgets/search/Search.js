import React, { Component } from 'react';

class Search extends Component {
	constructor() {
		super()
		this.state = { selected: 'https://www.google.com/search?q=', search: '' }
	}
	
	handleInput(val) { this.setState({ search: val }) }
	keyPress(e) { if (e.keyCode === 13) { document.getElementById('searchButton').click() } }

	render() {
		return (
			<div>
				<select onChange={(e) => this.setState({ selected: e.target.value })} placeholder="Google">
					<option value='https://www.google.com/search?q=' onClick={() => this.selectGoogle()}>Google</option>
					<option value='https://search.yahoo.com/search?q='>Yahoo</option>
					<option value='https://www.bing.com/search?q='>Bing</option>
					<option value='https://duckduckgo.com/?q='>Duckduckgo</option>
					<option value='https://search.aol.com/aol/search?q='>Netscape</option>
				</select>
				<input onChange={(e) => this.handleInput(e.target.value)} onKeyDown={this.keyPress} />
				<a href={`${this.state.selected}${this.state.search}`} target="_blank" id="searchButton"><button>Go!</button></a>
			</div>
		);
	}
}

export default Search;