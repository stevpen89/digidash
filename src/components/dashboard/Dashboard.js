//DEPENDENCIES
import React, { Component } from 'react'
import RGL, { WidthProvider } from "react-grid-layout";
import '../../../node_modules/react-grid-layout/css/styles.css'
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

const ReactGridLayout = WidthProvider(RGL);


class Dashboard extends Component {
  //grabs the user id
    constructor(props) {
      super(props)
      this.state={
        width: 10,
        height: 2,
        layout: [],
        locked:false
      }
      this.onLayoutChange=this.onLayoutChange.bind(this);
    }
  componentDidMount () {axios.get('/api/user-data').then(response => this.props.setUser(response.data))}

  login () {
    //logs the user in
    const {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
    const url = `${window.location.origin}/auth/callback`;
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
  }
  onLayoutChange(val){
    console.log()
    this.setState({
      layout: val
    })
  }
  updateDB(i){
		const {layout} = this.state
		let indexKeys  = layout.map((val)=>{return val.i})
		let layoutKey  = indexKeys.indexOf(i.toString())
		let dashX      = layout[layoutKey].x
		let dashY      = layout[layoutKey].y
		let dashHeight = layout[layoutKey].h
		let dashWidth  = layout[layoutKey].w
		console.log("i", i, "x", dashX, "y", dashY, "h", dashHeight, "w", dashWidth)
		// axios.put(`/widget/position/${this.props.user_id` ,{i:i,x:dashX,y:dashY,w:dashWidth,h:dashHeight}).then((res)=>{console.log(i,x,y,h,w)})
	}

  map(){
    let arr =[]
    var height = 8;
    var width = this.state.width;
    for(let q =0;q<3;q++){
      arr.push(
        <div onMouseUpCapture={()=>this.updateDB(q)} 
        style={{backgroundColor: 'gray'}} className="gridItem" key={q.toString()} 
        data-grid={{i: q.toString(),x: 0, y: 0, w: width, h: height, static:this.state.locked}}>We Are Clones
        <Clock/>
        <button onMouseUp={()=>console.log(this.state.layout[q])}>Do the Things</button>
        </div>
      )
    }
    return arr;
  }

  lockToggle(){
    this.setState((prevState)=>{return {locked:!prevState.locked}});
    console.log(this.state.locked)
  }

  render() {
    return (
      <div>
        Ay bruv, this is the Dashboard.
        <button onClick={() => this.lockToggle()}>Lock</button>
        <button onClick={() => this.login()}>Login</button>
        <div style={{width: '100%', height: '100vh',  overflow: 'scroll'}}>
         <ReactGridLayout  className="layout" cols={30} rowHeight={5} width={800} height={300}
                   layout={this.state.layout}
                   onLayoutChange={this.onLayoutChange}
                   isDraggable={this.state.locked}
                   isResizable={this.state.locked}
                   // onLayoutChange={this.onLayoutChange}
         >
           {this.map()}
           
         </ReactGridLayout>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {return {user_id: state.user_id}};
export default connect(mapStateToProps, {setUser})(Dashboard);