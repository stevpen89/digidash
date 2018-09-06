import React, { Component } from 'react';
import './App.css';

import {HashRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Dashboard from './components/dashboard/Dashboard'
import Setup from './components/setup/Setup'

class App extends Component {

  render() {
    return (
      <frosted-glass-container>
        <div id="App" style={{background: `center fixed url(${this.props.user_bg})`, backgroundSize: `cover`, minHeight: `100vh`, transition: `1s`}}>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/setup" component={Setup}/>
            </Switch>
          </HashRouter>
        </div>
      </frosted-glass-container>
    );
  }
}

function mapStateToProps (state) {return {user_bg: state.user_bg}};
export default connect(mapStateToProps)(App);