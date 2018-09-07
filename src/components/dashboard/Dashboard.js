//DEPENDENCIES
import React, { Component } from 'react'
import RGL, { WidthProvider } from "react-grid-layout";
import '../../../node_modules/react-grid-layout/css/styles.css'
import axios from 'axios'
//REDUX
import { connect } from 'react-redux'
import { setUser } from '../../ducks/reducer'
//WIDGETS
import Clock from '../widgets/clock/Clock'
import Dictionary from '../widgets/dictionary/Dictionary'
<<<<<<< HEAD
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
=======
import Note from '../widgets/note/Note'
import Search from '../widgets/search/Search'
import Weather from '../widgets/weather/Weather'

const ReactGridLayout = WidthProvider(RGL);

class Dashboard extends Component {
  //grabs the user id
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      layout: [],
      locked: false
    }
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }
  //axios call to get user data from auth zero storing on redux.
  componentDidMount() {
    axios.get(`/widget/${this.props.user_id}`).then(res => this.setState({ widgets: res.data }))
    // axios.get('/api/user-data').then(response => this.props.setUser(response.data)).then((res) => {
    //   axios.get(`/widget/${res.payload.user_id}`).then(res => this.setState({ layout: res.data }))
    // })
  }
  //
  login() {
    //logs the user in
    const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
    const url = `${window.location.origin}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
  }
  onLayoutChange(val) {
    console.log()
    this.setState({
      layout: val
    })
  }
  updateDB(i) {
    const { layout } = this.state
    console.log(layout);
    let indexKeys = layout.map(val => val.i)
    let layoutKey = indexKeys.indexOf(i.toString())
    let dashX = layout[layoutKey].x
    let dashY = layout[layoutKey].y
    let dashHeight = layout[layoutKey].h
    let dashWidth = layout[layoutKey].w
    console.log("i", i, "x", dashX, "y", dashY, "h", dashHeight, "w", dashWidth)
    axios.put(`/widget/position/${i}`, { i: i, x: dashX, y: dashY, w: dashWidth, h: dashHeight })
  }

  lockToggle() {
    this.setState((prevState) => { return { locked: !prevState.locked } });
  }

  widgetSwitch(val) {
    switch (val * 1) {
      case 1:
        return <Search />;
      case 2:
        return <Dictionary />;
      case 3:
        return <Note />;
      case 4:
        return <Clock />;
      case 5:
        return <Weather />;
      default:
        return 'defaulted';
    }
>>>>>>> master
  }

  render() {
    return (
      <div>
        <button onClick={() => this.lockToggle()}>Lock</button>
        <button onClick={() => this.login()}>Login</button>
        <div>
          <ReactGridLayout className="layout" cols={30} rowHeight={5} width={800} height={300}
            layout={this.state.layout}
            onLayoutChange={this.onLayoutChange}
            isDraggable={this.state.locked}
            isResizable={this.state.locked}
            verticalCompact={false}>

            {this.state.widgets.map((val) => (
              <div
                style={{ borderRadius: '5px', overflow: 'hidden' }}
                key={`${val.master_id}`}
                data-grid={{ i: `${val.master_id}`, x: val.x, y: val.y, w: val.w, h: val.h }}
                onMouseUpCapture={() => this.updateDB(val.master_id)}
              >
                {console.log(val.widget_id)}
                {this.widgetSwitch(val.widget_id)}
              </div>
            ))}

          </ReactGridLayout>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) { return { user_id: state.user_id } };
export default connect(mapStateToProps, { setUser })(Dashboard);