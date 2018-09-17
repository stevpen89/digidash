//DEPENDENCIES
import React, { Component } from 'react';
import RGL, { WidthProvider } from "react-grid-layout";
import axios from 'axios';

//STYLING
import '../../../node_modules/react-grid-layout/css/styles.css'
import GridTheme from './GridTheme';
import './Dashboard.css'

//WIDGETS
import Calculator     from '../widgets/calculator/Calculator';
import Clock          from '../widgets/clock/Clock';
import Currency       from '../widgets/currency/Currency';
import Bitcoin        from '../widgets/bitcoin/Bitcoin';
import Dictionary     from '../widgets/dictionary/Dictionary';
import Favorites      from '../widgets/favorites/Favorites';
import Note           from '../widgets/note/Note';
import Restaurants    from '../widgets/restaurants/Restaurants';
import Search         from '../widgets/search/Search';
import Stocks         from '../widgets/stocks/Stocks';
import Weather        from '../widgets/weather/Weather';
import GlobalSettings from './GlobalSettings';

//REDUX
import { connect }    from 'react-redux';
import { setUser }    from '../../ducks/reducer';

const ReactGridLayout = WidthProvider(RGL);

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      widgets    : [],
      layout     : [],
      locked     : false,
      drawerOpen : false,
      deleteMode : false,
      globalOpen : false
    }
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.updateWidgets  = this.updateWidgets.bind(this);
    this.globalToggle   = this.globalToggle.bind(this);
  }

  //axios call to get user data from auth zero storing on redux.
  componentDidMount() {
    this.updateWidgets()
    axios.get('/api/user-data').then(response =>this.props.setUser(response.data)).then((res) => {
      axios.get(`/widget/${res.payload.user_id}`).then(res => this.setState({ layout: res.data }))
    })
  }

  //authZero
  login() {
    const { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
    const url = `${window.location.origin}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
  }

  //makes it so you cannot move your widgets with RGL.
  lockToggle() {this.setState((prevState) => { return { locked: !prevState.locked } }) }

  //refreshes all widgets on RGL
  updateWidgets() { axios.get(`/widget/${this.props.user_id}`).then(res => this.setState({ widgets: res.data })) }

  //layout business with RGL
  onLayoutChange(val) { this.setState({ layout: val }) }

  //makes it so you can delete widgets in the toolbar.
  toggleDeleteMode() {this.setState({deleteMode: !this.state.deleteMode})}

  //deletes a widget
  deleteWidget(val){axios.delete(`/widget/${val}`).then(() => this.updateWidgets()) }

  //opens and close the global menu
  globalToggle(){ this.setState({globalOpen:!this.state.globalOpen}) }

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

  //Rendering specific widgets according to Widget Id in database and its case number... Add a widget here when created.
  widgetSwitch(val) {
    const { updateWidgets } = this;

    let key      = `${val.master_id}`
    let updateDB = () => this.updateDB(val.master_id)
    let dataGrid = {i: `${val.master_id}`, x: val.x, y: val.y, w: val.w, h: val.h}

    switch (val.widget_name) {
      case 'Search'      : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Search      o={val} updateWidgets={updateWidgets} /></div>;
      case 'Dictionary'  : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Dictionary  o={val} updateWidgets={updateWidgets} /></div>;
      case 'Note'        : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Note        o={val} updateWidgets={updateWidgets} /></div>;
      case 'Clock'       : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Clock       o={val} updateWidgets={updateWidgets} /></div>;
      case 'Weather'     : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Weather     o={val} updateWidgets={updateWidgets} /></div>;
      case 'Calculator'  : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Calculator  o={val} updateWidgets={updateWidgets} /></div>;
      case 'Bitcoin'     : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Bitcoin     o={val} updateWidgets={updateWidgets} /></div>;
      case 'Favorites'   : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Favorites   o={val} updateWidgets={updateWidgets} /></div>;
      case 'Currency'    : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Currency    o={val} updateWidgets={updateWidgets} /></div>;
      case 'Stocks'      : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Stocks      o={val} updateWidgets={updateWidgets} /></div>;
      case 'Restaurants' : return <div key={key} data-grid={dataGrid} onMouseUpCapture={updateDB}><Restaurants o={val} updateWidgets={updateWidgets} /></div>;
      default            : return 'defaulted';
    }
  }

  //Renders a specific icon in the toolbar based on which widget it is
  toolbarSwitch(val) {
    switch (val.widget_name) {
      case 'Search'      : return <i className="fas fa-search"         ></i>;
      case 'Dictionary'  : return <i className="fas fa-book-open"      ></i>;
      case 'Note'        : return <i className="fas fa-sticky-note"    ></i>;
      case 'Clock'       : return <i className="fas fa-clock"          ></i>;
      case 'Weather'     : return <i className="fas fa-cloud"          ></i>;
      case 'Calculator'  : return <i className="fas fa-calculator"     ></i>;
      case 'Bitcoin'     : return <i className="fab fa-btc"            ></i>;
      case 'Favorites'   : return <i className="fas fa-star"           ></i>;
      case 'Currency'    : return <i className="fas fa-money-check-alt"></i>;
      case 'Stocks'      : return <i className="fas fa-chart-line"     ></i>;
      case 'Restaurants' : return <i className="fas fa-utensils"       ></i>;
      default            : return 'defaulted';
    }
  }

  //renders out a drawer item
  drawerItem (widget_name, w, h, fa_icon, o1, o2, o3, o4, o5, o6) {
    const {user_id} = this.props
    return (
      <div onClick={() => {axios.post(`/widget/${user_id}`,
        {user_id, widget_name, x: 0, y: 0, w, h, o1, o2, o3, o4, o5, o6})
        .then(() => this.updateWidgets())}}>
        <i className={fa_icon}></i><a>{widget_name}</a>
      </div>)
  }

  render() {
    const { locked, layout, drawerOpen, globalOpen } = this.state;
    const { compact, collision, user_name } = this.props;
    return (
      <div>

        {/* HEADER */}
        <div className="header">
          <div className="user-info">{user_name.replace(/\s/g, ' | ')}</div>
          <div className="user-controls">
            <button onClick={()=>this.globalToggle()}>•••</button><a>|</a>
            <button onClick={() => this.login()} className="theme-color"><i className="fas fa-users"></i></button><a>|</a>
            <button onClick={() => this.lockToggle()} className="theme-color">{!locked ? <i className="fas fa-lock"></i> : <i className="fas fa-lock-open"></i>}</button>
          </div>
        </div>

        {/* GLOBAL SETTINGS */}
        <GlobalSettings globalOpen={globalOpen} globalToggle={this.globalToggle}/>
       
        {/* REACT GRID */}
        <GridTheme />
        <ReactGridLayout
          className="layout"
          cols             = {30}
          rowHeight        = {5}
          width            = {800}
          height           = {300}
          layout           = {layout}
          onLayoutChange   = {this.onLayoutChange}
          isDraggable      = {locked}
          isResizable      = {locked}
          compactType      = {compact ? 'vertical' : null}
          preventCollision = {collision}>
          {this.state.widgets.map((val) => (this.widgetSwitch(val)))}
        </ReactGridLayout>

        {/* DRAWER */}
        <div style={{
          display         : `flex`,
          width           : `100vw`,
          height          : `100vh`,
          zIndex          : `5`,
          position        : `fixed`,
          top             : `0`,
          left            : `0`,
          backgroundColor : `black`,
          pointerEvents   : drawerOpen ? `auto` : `none`,
          opacity         : drawerOpen ? `1` : `0`,
          transition      : `.5s`
        }}>
          <div className="drawer">
            {/* Widget Name, HeigIcon, o1, o2, o3, o4, o5, o6 */}
            {this.drawerItem ('Search',      26, 4,  'fas fa-search'         )}
            {this.drawerItem ('Weather',     10, 10, 'fas fa-cloud'          )}
            {this.drawerItem ('Dictionary',  10, 10, 'fas fa-book-open'      )}
            {this.drawerItem ('Clock',       5,  11, 'fas fa-clock', 'true'  )}
            {this.drawerItem ('Note',        5,  18, 'fas fa-sticky-note'    )}
            {this.drawerItem ('Calculator',  5,  18, 'fas fa-calculator'     )}
            {this.drawerItem ('Bitcoin',     15, 22, 'fab fa-btc'            )}
            {this.drawerItem ('Favorites',   6,  8,  'fas fa-star'           )}
            {this.drawerItem ('Currency',    6,  8,  'fas fa-money-check-alt')}
            {this.drawerItem ('Stocks',      10, 12, 'fas fa-chart-line'     )}
            {this.drawerItem ('Restaurants', 10, 12, 'fas fa-utensils'       )}
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
              <button onClick={() => this.setState({ drawerOpen: !this.state.drawerOpen })}>
                {this.state.drawerOpen ? <i className="fas fa-minus-square"></i> : <i className="fas fa-plus-square"></i>}
              </button>
            </div>
          </div >
         
        </div >
    )
  }
}

function mapStateToProps(state) {
	const  { user_id, user_name, search, compact, collision } = state
	return { user_id, user_name, search, compact, collision }
};
export default connect(mapStateToProps, { setUser })(Dashboard);