import React, { Component } from 'react';
import Clock from 'react-clock';
import Digital from './Digital'
import './Clock.css'

class WidgetClock extends Component {
  constructor() {
    super()
    this.state = {
      show: true,
      theme: true,
      date: new Date()
    }
  }


  componentDidMount() {
    setInterval(
      () => this.setState({ date: new Date() }),
      1000
    );
  }

  toggle() {
    this.setState({
      show: !this.state.show
    })
  }

  themeChange() {
    this.setState({
      theme: !this.state.theme
    })
  }

  render() {
    return (
      <div className="clock">
        <button onClick={() => { this.toggle() }}>{this.state.show ? 'Digital' : 'Analog'}</button>
        {this.state.show ? <div><button onClick={() => { this.themeChange() }}>theme change</button></div> : null}
        <div>{this.state.show ? <Clock
          value={this.state.date}
          // className="analog-clock"
          // hourHandLength='80'
          // hourHandOppositeLength='20'
          // hourHandWidth='3'
          // hourMarksLength='8'
          // hourMarksWidth='2'
          // minuteHandLength='60'
          // minuteHandOppositeLength='20'
          // minuteHandWidth='2'
          // minuteMarksLength='6'
          // minuteMarksWidth='1'
          // renderHourMarks={true}
          // renderMinuteHand={true}
          // renderMinuteMarks={true}
          // renderNumbers={false}
          // renderSecondHand={true}
          // secondHandLength='80'
          // secondHandOppositeLength='20'
          // secondHandWidth='2'
          // size='150'
        /> : <Digital />}</div>
      </div>
    );
  }
}

export default WidgetClock;