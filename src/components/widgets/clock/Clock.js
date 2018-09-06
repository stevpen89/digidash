import React, { Component } from 'react';
import AnalogClock, { Themes } from 'react-analog-clock';
import Digital from './Digital'

import './App.css';

class Clock extends Component {
  constructor() {
    super()
    this.state = {
      show: true,
      theme: true
    }
  }

  toggle() {
    this.setState({
      show: !this.state.show
    })
  }

  themeChange(){
    this.setState({
      theme: !this.state.theme
    })
  }


  render() {
    console.log(this.state)
    return (
      <div className="App">
        <button onClick={() => { this.toggle() }}>{this.state.show ? 'Digital' : 'Analog' }</button>
        { this.state.show ? <div><button onClick={()=>{this.themeChange()}}>theme change</button></div> : null }
        <div>{this.state.show ? <AnalogClock theme={this.state.theme ? Themes.dark : Themes.light} /> : <Digital /> }</div>
      </div>
    );
  }
}

export default Clock;
