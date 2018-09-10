//DEPENDENCIES
import React, { Component } from 'react'
import RGL, { WidthProvider } from "react-grid-layout"
import axios from 'axios'
//STYLING
import '../../../node_modules/react-grid-layout/css/styles.css'
import GridTheme from './GridTheme'
import './Dashboard.css'
//WIDGETS
import Clock from '../widgets/clock/Clock'
import Dictionary from '../widgets/dictionary/Dictionary'
import Note from '../widgets/note/Note'
import Search from '../widgets/search/Search'
import Weather from '../widgets/weather/Weather'
//REDUX
import { connect } from 'react-redux'
import { setUser } from '../../ducks/reducer'

const ReactGridLayout = WidthProvider(RGL);

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      layout: [],
      locked: false,
      drawerOpen: false,
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

  //authZero
  login() {
    const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
    const url = `${window.location.origin}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
  }

  //layout business with RGL
  onLayoutChange(val) { this.setState({ layout: val }) }

  //Updating layout according to specific user
  updateDB(i) {
    const { layout } = this.state
    let indexKeys = layout.map(val => val.i)
    let layoutKey = indexKeys.indexOf(i.toString())
    let x = layout[layoutKey].x
    let y = layout[layoutKey].y
    let h = layout[layoutKey].h
    let w = layout[layoutKey].w
    axios.put(`/widget/position/${i}`, { i, x, y, w, h })
  }

  //makes it so you cannot move your widgets with RGL.
  lockToggle() { this.setState((prevState) => { return { locked: !prevState.locked } }) }

  //Rendering specific widgets according to Widget Id in database and its case number... Add a widget here when created.
  widgetSwitch(val) {
    console.log(val)
    switch (val.widget_name) {
      case 'Search': return <Search o={val} />;
      case 'Dictionary': return <Dictionary o={val} />;
      case 'Note': return <Note o={val} />;
      case 'Clock': return <Clock o={val} />;
      case 'Weather': return <Weather o={val} />;
      default: return 'defaulted';
    }
  }

  toolbarSwitch(val){
    switch (val.widget_name) {
      case 'Search': return <i className="fas fa-search"></i>;
      case 'Dictionary': return <i className="fas fa-book-open"></i>;
      case 'Note': return <i className="fas fa-sticky-note"></i>;
      case 'Clock': return <i className="fas fa-clock"></i>;
      case 'Weather': return <i className="fas fa-sun"></i>;
      default: return 'defaulted';
    }
  }

  addWidget(val){
    
  }

  render() {
    return (
      <div>

        {/* HEADER */}
        <div className="header">

          <div className="user-info">
            {this.props.user_name.replace(/\s/g, ' | ')}
          </div>

          <div className="user-controls">
            <button>
              •••
            </button><a>|</a>

            <button onClick={() => this.login()} className="theme-color">
              <i class="fas fa-users"></i>
            </button><a>|</a>

            <button onClick={() => this.lockToggle()} className="theme-color">
              {!this.state.locked ? <i class="fas fa-lock"></i> : <i class="fas fa-lock-open"></i>}
            </button>
          </div>

        </div>

        {/* REACT GRID */}
        <GridTheme />
        <ReactGridLayout
          className="layout"
          cols={30}
          rowHeight={5}
          width={800}
          height={300}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
          isDraggable={this.state.locked}
          isResizable={this.state.locked}
          compactType={null}
          preventCollision={true}>

          {this.state.widgets.map((val) => (
            <div
              key={`${val.master_id}`}
              data-grid={{ i: `${val.master_id}`, x: val.x, y: val.y, w: val.w, h: val.h }}
              onMouseUpCapture={() => this.updateDB(val.master_id)}>
              {this.widgetSwitch(val)}
            </div>
          ))}
        </ReactGridLayout>
        <Note/>

        {/* DRAWER */}
        <div style={{
          display: `flex`,
          width: `100vw`,
          height: `100vh`,
          zIndex: `5`,
          position: `absolute`,
          top: `0`,
          left: `0`,
          backgroundColor: `black`,
          pointerEvents: this.state.drawerOpen ? `auto` : `none`,
          opacity: this.state.drawerOpen ? `1` : `0`,
          transition: `.5s`
        }}>
          <div className="drawer">
            <button className="filled-button">Drawer</button>
          </div>
          <div className="drawer-background"></div>
        </div>

        {/* TOOLBAR */}
        <div className={this.state.locked ? 
          'toolbar toolbar-open' :
           'toolbar'}>
        <div style={{display:"flex", color:"red"}}>{this.state.widgets ?
           this.state.widgets.map((val)=>{return <div style={{fontSize:"30px", margin:"0 10px"}} onClick={()=>this.addWidget(val.widget_name)}>{this.toolbarSwitch(val)}</div>}) :
            ''}</div>
          <div><button onClick={() => this.setState({ drawerOpen: !this.state.drawerOpen })}><i class="fas fa-plus-square"></i></button></div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) { return { user_id: state.user_id, user_name: state.user_name } };
export default connect(mapStateToProps, { setUser })(Dashboard);