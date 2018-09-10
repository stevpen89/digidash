import React, { Component } from 'react';
<<<<<<< HEAD


class Search extends Component {
    constructor(props){
        super(props)
        this.state={
            selected: "http://www.google.com/search",
        }
    }
    selectYahoo(){
        this.setState({
            selected: "https://search.yahoo.com/search"
        })
    
    }
    selectGoogle(){
        this.setState({
            selected: "http://www.google.com/search"
        })
    
    }
    selectBing(){
        this.setState({
            selected: "https://www.bing.com/search"
        })
    
    }
    selectDuck(){
        this.setState({
            selected: "https://duckduckgo.com/"
        })
    
    }
    selectNetscape(){
        console.log('this is running')
        this.setState({
            selected: "https://search.aol.com/aol/search"
        })
    
    }

    
  render() {
      console.log(this.state)
    return (
      <div style={{display: 'flex'}}>
        <div style={{width: '40vh',float: 'left'}}>
            <form method="get" action={this.state.selected}>

            <div >
            <table >
            <tr><td>
            <input type="text"   name="q" />

            <input type="submit" value="Go!" />
            <input type="hidden"  /></td></tr>
            </table>
            </div>

            </form>
			<div >

<button onClick={()=>this.selectGoogle()}>google</button>
<button onClick={()=>this.selectYahoo()}>yahoo</button>
<button onClick={()=>this.selectBing()}>bing</button>
<button onClick={()=>this.selectDuck()}>duckduckgo</button>
<button onClick={()=>this.selectNetscape()}>Netscape</button>

</div>
        </div>
      </div>
    );
  }
=======
import './Search.css';

class Search extends Component {
	constructor() {
		super()
		this.state = { selected: 'https://www.google.com/search?q=', search: '' }
	}
	
	handleInput(val) { this.setState({ search: val }) }
	keyPress(e) { if (e.keyCode === 13) { document.getElementById('searchButton').click() } }

	render() {
		return (
			<div className="search">
				<select onChange={(e) => this.setState({ selected: e.target.value })} placeholder="Google">
					<option value='https://www.google.com/search?q='>Google</option>
					<option value='https://search.yahoo.com/search?q='>Yahoo</option>
					<option value='https://www.bing.com/search?q='>Bing</option>
					<option value='https://duckduckgo.com/?q='>Duck Duck Go</option>
					<option value='https://search.aol.com/aol/search?q='>Netscape</option>
					<option value='https://en.wikipedia.org/w/index.php?search='>wikipedia</option>
				</select>
				<input onChange={(e) => this.handleInput(e.target.value)} onKeyDown={this.keyPress} className="theme-input"/>
				<a href={`${this.state.selected}${this.state.search}`} target="_blank" id="searchButton"><button className="theme-text">Go</button></a>
				<div className="theme-glow"></div>
			</div>
		);
	}
>>>>>>> master
}

export default Search;