//DEPENDENCIES
import React, { Component } from 'react'
import ReactGridLayout from 'react-grid-layout'
import axios from 'axios'
//REDUX
import {connect}  from 'react-redux'
import {setUser}  from '../../ducks/reducer'
//WIDGETS
import Clock      from '../widgets/clock/Clock'
import Dictionary from '../widgets/dictionary/Dictionary'
import Note       from '../widgets/note/Note'
import Search     from '../widgets/search/Search'
import Weather    from '../widgets/weather/Weather'

class Dashboard extends Component {
  //grabs the user id
  componentDidMount () {axios.get('/api/user-data').then(response => this.props.setUser(response.data))}

  login () {
    //logs the user in
    const {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
    const url = `${window.location.origin}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
  }

  render() {
    return (
      <div>
        Ay bruv, this is the Dashboard.
        <button onClick={() => this.login()}>Login</button>
        <ReactGridLayout className="layout" cols={30} rowHeight={20} width={1200} height={300}>
          <div key="1" data-grid={{ i: '1', x: 3, y: 5, w: 3, h: 4 }}><Clock /></div>
          <div key="2" data-grid={{ i: '2', x: 3, y: 5, w: 3, h: 4 }}><Dictionary /></div>
          <div key="3" data-grid={{ i: '3', x: 3, y: 5, w: 3, h: 4 }}><Note /></div>
          <div key="4" data-grid={{ i: '4', x: 3, y: 5, w: 3, h: 4 }}><Search /></div>
          <div key="5" data-grid={{ i: '5', x: 3, y: 5, w: 3, h: 4 }}><Weather /></div>
        </ReactGridLayout>
      </div>
    )
  }
}

function mapStateToProps (state) {return {user_id: state.user_id}};
export default connect(mapStateToProps, {setUser})(Dashboard);