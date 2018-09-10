import React, { Component } from 'react';
import ClockTheme from './ClockTheme';
import Clock from 'react-clock';
import Digital from './Digital'
import './Clock.css'

class WidgetClock extends Component {
  constructor() {
    super()
    this.state = {
      miniSettings: false,
      show: true,
      date: new Date(),
      theme: `background: rgba(255,255,255,.5)`
    }
  }

  componentDidMount() { setInterval(() => this.setState({ date: new Date() }), 1000) }
  toggleSettings() { this.setState({ miniSettings: !this.state.miniSettings }) }
  toggle() { this.setState({ show: !this.state.show }) }

  render() {
    console.log('chicken nugget swag', this.props.o.o1)
    return (
      <div className="clock standard-widget">

        <ClockTheme theme={this.state.theme} />
        <button className="widget-settings-button" onClick={() => this.toggleSettings()}>•••</button>

        {this.state.miniSettings ?
          <div className="widget-settings">
            <div className={!this.state.show ? `checkbox checked theme-color` : `checkbox`} onClick={() => { this.toggle() }}>
              <i class="fas fa-check"></i>
            </div>
            <a>Digital</a>
          </div> : null
        }

        <div>{this.state.show ? <Clock value={this.state.date} size='200' /> : <Digital />}</div>
        <div className="theme-glow"></div>
        <div className="theme-accent"></div>
      </div>
    );
  }
}

export default WidgetClock;