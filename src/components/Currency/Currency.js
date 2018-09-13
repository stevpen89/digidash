import React, {Component} from 'react';
import axios from 'axios'
import './App.css'



export default class Autocomplete extends Component {
  constructor() {
    super();
    this.state = { 
    val1: "",
    val2: "",
    val3: 1,
    convert: {}
  };
  }
 

  getIn1(val){
    this.setState({
      val1: val
    })
  }
  getIn2(val){
    this.setState({
      val2: val
    })
  }
  getIn3(val){
    this.setState({
      val3: val
    })
  }
  getCurency(){
    console.log('this works')
    const {val1,val2} = this.state
    axios.post('/api/getcurency',{val1,val2}).then(res=>{
      var key = val1+'_'+val2;
      console.log(res.data.results[key])
      this.setState({ convert: res.data.results[key] });
    })}
  showcurrency(){
    const {val2,val3, convert} = this.state
    let num = convert.val*val3
    return(
      <div>
        <p>{new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(num)}</p>
      </div>
    )
  }

  render() {
    return (
     

      <div>
        
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex',flexDirection: "column"}}>
          <input onChange={e=>this.getIn1(e.target.value)}/>
          <input onChange={e=>this.getIn2(e.target.value)}/>
        </div>
        <div style={{display: 'flex',flexDirection: "column" }}>
          <input onChange={e=>this.getIn3(e.target.value)}/>
          <p>{this.showcurrency()}</p>
        </div>
      </div>

        <button onClick={()=> this.getCurency()}>the things</button>
      
      </div>


    );
  }
}