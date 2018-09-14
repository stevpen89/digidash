//DEPENDENCIES
import React, { Component } from 'react'
import RGL, { WidthProvider } from "react-grid-layout"
import axios from 'axios'
//STYLING
import '../../../node_modules/react-grid-layout/css/styles.css'
import GridTheme from './GridTheme'
import './Dashboard.css'
import { Scrollbars } from 'react-custom-scrollbars';
//WIDGETS
import Clock from '../widgets/clock/Clock'
import Dictionary from '../widgets/dictionary/Dictionary'
import Note from '../widgets/note/Note'
import Search from '../widgets/search/Search'
import Weather from '../widgets/weather/Weather'
import GlobalSettings from './GlobalSettings'
import Calculator from '../widgets/calculator/Calculator'
import Favorites from '../widgets/favorites/Favorites'
import Bitcoin from '../widgets/bitcoin/Bitcoin'
import Currency from '../Currency/Currency'
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
      deleteMode: false,
      globalOpen: false
    }
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.updateWidgets = this.updateWidgets.bind(this);
  }

  //axios call to get user data from auth zero storing on redux.
  componentDidMount() {
    this.updateWidgets()
    axios.get('/api/user-data').then(response =>this.props.setUser(response.data)).then((res) => {
      axios.get(`/widget/${res.payload.user_id}`).then(res => this.setState({ layout: res.data }))
    })
  }

  updateWidgets() { axios.get(`/widget/${this.props.user_id}`).then(res => this.setState({ widgets: res.data })) }

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
  lockToggle() {
    this.setState((prevState) => { return { locked: !prevState.locked } })
  }

  toggleDeleteMode() {this.setState({deleteMode: !this.state.deleteMode})}

  //Rendering specific widgets according to Widget Id in database and its case number... Add a widget here when created.
  widgetSwitch(val) {
    switch (val.widget_name) {
      case 'Search': return <Search o={val} updateWidgets={this.updateWidgets} />;
      case 'Dictionary': return <Dictionary o={val} updateWidgets={this.updateWidgets} />;
      case 'Note': return <Note o={val} updateWidgets={this.updateWidgets} />;
      case 'Clock': return <Clock o={val} updateWidgets={this.updateWidgets} />;
      case 'Weather': return <Weather o={val} updateWidgets={this.updateWidgets} />;
      case 'Calculator': return <Calculator o={val} updateWidgets={this.updateWidgets} />;
      case 'Bitcoin': return <Bitcoin o={val} updateWidgets={this.updateWidgets} />;
      case 'Favorites': return <Favorites o={val} updateWidgets={this.updateWidgets} />;
      default: return 'defaulted';
    }
  }

  toolbarSwitch(val) {
    switch (val.widget_name) {
      case 'Search': return <i className="fas fa-search"></i>;
      case 'Dictionary': return <i className="fas fa-book-open"></i>;
      case 'Note': return <i className="fas fa-sticky-note"></i>;
      case 'Clock': return <i className="fas fa-clock"></i>;
      case 'Weather': return <i className="fas fa-cloud"></i>;
      case 'Calculator': return <i className="fas fa-calculator"></i>;
      case 'Bitcoin': return <i className="fab fa-btc"></i>;
      case 'Favorites': return <i className="fas fa-star"></i>;
      default: return 'defaulted';
    }
  }

  deleteWidget(val){
    axios.delete(`/widget/${val}`).then(() => this.updateWidgets())
  }

  globalToggle(){
    this.setState({globalOpen:!this.state.globalOpen})
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
            <button onClick={()=>this.globalToggle()}>
              •••
            </button><a>|</a>

            <button onClick={() => this.login()} className="theme-color">
              <i className="fas fa-users"></i>
            </button><a>|</a>

            <button onClick={() => this.lockToggle()} className="theme-color">
              {!this.state.locked ? <i className="fas fa-lock"></i> : <i className="fas fa-lock-open"></i>}
            </button>
          </div>

        </div>
<<<<<<< HEAD
        {this.state.globalOpen?
      <div className="widget-settings globalWrapper" >
        <GlobalSettings/>
      </div>:null}
          
=======
        { this.state.globalOpen ? <GlobalSettings/> : null }

>>>>>>> master
        {/* REACT GRID */}
        <Currency />
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
          compactType={'vertical'}
          preventCollision={false}>

          {this.state.widgets.map((val) => (
            <div
              key={`${val.master_id}`}
              data-grid={{ i: `${val.master_id}`, x: val.x, y: val.y, w: val.w, h: val.h }}
              onMouseUpCapture={() => this.updateDB(val.master_id)}>
              {this.widgetSwitch(val)}
            </div>
          ))}
           
        </ReactGridLayout>
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
            <div onClick={() => {
              axios.post(`/widget/${this.props.user_id}`, {
                user_id: this.props.user_id,
                widget_name: 'Search', x: 0, y: 0, w: 26, h: 4
              })
                .then(() => this.updateWidgets())
            }
            }><i className="fas fa-search"></i><a>Search</a></div>
            <div onClick={() => {
              axios.post(`/widget/${this.props.user_id}`, {
                user_id: this.props.user_id,
                widget_name: 'Weather', x: 0, y: 0, w: 10, h: 10
              })
                .then(() => this.updateWidgets())
            }
            }><i className="fas fa-cloud"></i><a>Weather</a></div>
            <div onClick={() => {
              axios.post(`/widget/${this.props.user_id}`, {
                user_id: this.props.user_id,
                widget_name: 'Dictionary', x: 0, y: 0, w: 10, h: 10
              })
                .then(() => this.updateWidgets())
            }
            }><i className="fas fa-book-open"></i><a>Dictionary</a></div>
            <div onClick={() => {
              axios.post(`/widget/${this.props.user_id}`, {
                user_id: this.props.user_id,
                widget_name: 'Clock', x: 0, y: 0, w: 5, h: 11, o1: 'true'
              })
                .then(() => this.updateWidgets())
            }
            }><i className="fas fa-clock"></i><a>Clock</a></div>
            <div onClick={() => {
              axios.post(`/widget/${this.props.user_id}`, {
                user_id: this.props.user_id,
                widget_name: 'Note', x: 0, y: 0, w: 5, h: 18
              })
                .then(() => this.updateWidgets())
            }
            }><i className="fas fa-sticky-note"></i><a>Note</a></div>
            <div onClick={() => {
              axios.post(`/widget/${this.props.user_id}`, {
                user_id: this.props.user_id,
                widget_name: 'Calculator', x: 0, y: 0, w: 5, h: 18
              })
                .then(() => this.updateWidgets())
            }
            }><i className="fas fa-calculator"></i><a>Calculator</a></div>
            <div onClick={() => {
              axios.post(`/widget/${this.props.user_id}`, {
                user_id: this.props.user_id,
                widget_name: 'Bitcoin', x: 0, y: 0, w: 15, h: 22
              })
                .then(() => this.updateWidgets())
            }
            }><i className="fab fa-btc"></i><a>Bitcoin</a></div>
            <div onClick={() => {
              axios.post(`/widget/${this.props.user_id}`, {
                user_id: this.props.user_id,
                widget_name: 'Favorites', x: 0, y: 0, w: 6, h: 8
              })
                .then(() => this.updateWidgets())
            }
            }><i className="fas fa-star"></i><a>Favorites</a></div>
          </div>
          <div className="drawer-background"></div>
        </div>
        {/* TOOLBAR */} 
        <div className={this.state.locked ? 'toolbar toolbar-open' : 'toolbar'}>
          <div style={{ display: "flex" }}>
            {this.state.widgets ?
            this.state.widgets.map((val) => {
              return (
                <div style={{ fontSize: "30px", margin: "0 10px" }} key={val.master_id}>
                  <div className="toolbar-icon">{this.toolbarSwitch(val)}
                    {this.state.deleteMode ?
                      <a onClick={() => this.deleteWidget(val.master_id)} className="delete-button">
                      <i className="fas fa-times"></i>
                      </a> : null}
                  </div>
                </div>
              )
            }) : null}
          </div>
            <div className="toolbar-controls">
              <button onClick={() => this.toggleDeleteMode()}><i className="fas fa-trash-alt"></i></button>
              <button onClick={() => this.setState({ drawerOpen: !this.state.drawerOpen })}>{this.state.drawerOpen ? <i className="fas fa-minus-square"></i> : <i className="fas fa-plus-square"></i>}</button>
            </div>
          </div >
         
        </div >
    )
  }
}

function mapStateToProps(state) { return { user_id: state.user_id, user_name: state.user_name } };
export default connect(mapStateToProps, { setUser })(Dashboard);