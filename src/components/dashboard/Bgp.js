import React, { Component } from 'react'
import axios from 'axios'
import './Bgp.css'
import { connect } from 'react-redux'
require('dotenv').config()

class Bgp extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imgs: [],
      showBig: false,
      selected: null
    }

  }

  changeHandle = e => {
    this.setState({ input: e });
    console.log(this.state.input)
  };



  performSearch = (query = 'rooster') => {
    axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=b874844bb8f6a93536f7e6e3ddc9a1eea4674cdfe9fe7e7fbdcbcecbba58ce05`).then(res => {
      this.setState({ imgs: res.data.results });
      console.log(this.state.imgs)
    }).catch(err => {
      console.log('Error happened during fetching!', err);
    });
  };

  bigPicture(index) {
    this.setState({ showBig: !this.state.showBig, selected: index });

  }
  showImages() {
    return

  }
  showBigImage() {
    return

  }

  render() {
    return (
      <div className="bgp">
        <div className="bgp-header">Wallpaper</div>
        <div className="bgp-search theme-text"><input onChange={(e) => this.changeHandle(e.target.value)} type="text" />
          <button style={{ color: "white", backgroundColor: "rgba(255,255,255,.1)" }} onClick={() => this.performSearch()}>GO</button>
        </div>
        <div className="bgp-images">
          {this.state.showBig ?
            this.state.showBig ? <div onClick={() => this.setState({ showBig: false })} style={{ background: `url(${this.state.imgs[this.state.selected].urls.regular}) center`, backgroundSize: `cover`, borderRadius: `3px`, height: `600px`, width: `1100px` }}></div> : null
            :
            this.state.imgs ? this.state.imgs.map((val, i) => { return <div className="map-item" onClick={() => this.bigPicture(i)} key={i} style={{ background: `url(${val.urls.small}) center`, backgroundSize: `cover`, borderRadius: `3px` }}></div> }) : null}
        </div>

      </div>
    )
  }
}

export default connect(null, {})(Bgp)