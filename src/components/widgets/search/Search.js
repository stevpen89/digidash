
import React, { Component } from 'react';


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
}

export default Search;

