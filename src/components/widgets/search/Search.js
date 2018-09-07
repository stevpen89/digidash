
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Search extends Component {
    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state={
            selected: "http://www.google.com/search",
            dropdownOpen: false
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

    toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
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
            <div  className='container' style={{float: 'right', }}>
                <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                Search
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem onClick={()=>this.selectGoogle()}>google</DropdownItem>
                <DropdownItem onClick={()=>this.selectYahoo()}>yahoo</DropdownItem>
                <DropdownItem onClick={()=>this.selectBing()}>bing</DropdownItem>
                <DropdownItem onClick={()=>this.selectDuck()}>duckduckgo</DropdownItem>
                <DropdownItem onClick={()=>this.selectNetscape()}>Netscape</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </div>
            </form>
        </div>
      </div>
    );
  }
}

export default Search;

