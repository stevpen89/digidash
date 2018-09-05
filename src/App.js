import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard/Dashboard'


class App extends Component {
  constructor() {
    super()
    this.state = {

    }
  }

 

  render() {
    return (
      <div className="App">
        <Dashboard />
      </div>
    );
  }
}

export default App;
