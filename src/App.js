import React, { Component } from 'react';
import AppTheme from './AppTheme'
import './App.css';

import {HashRouter, Switch, Route} from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard'
import Setup from './components/setup/Setup'

export default class App extends Component {

  render() {
    return (
      <div>
        <AppTheme />
        <div id="App">
          <HashRouter>
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route path="/setup" component={Setup}/>
            </Switch>
          </HashRouter>
        </div>
      </div>

    );
  }
}