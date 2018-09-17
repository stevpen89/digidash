import React, { Component } from 'react'
import axios from 'axios'
import './Bgp.css'
import { connect } from 'react-redux'
import { setTheme, setColor, setBG } from '../../ducks/reducer'
import { Scrollbars } from 'react-custom-scrollbars';
require('dotenv').config()

class Bgp extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imgs: [],
      showBig: false,
      selected: null,
      vibrant: {
        vibrant: null,
        muted: null,
        lightVibrant: null,
        lightMuted: null,
        darkVibrant: null,
        darkMuted: null
      },
      image: null,
      color: null,
      theme: null
    }

  }

  changeHandle = e => {
    this.setState({ input: e });
  };

  keyPress(e) { if (e.keyCode === 13) { document.getElementById('searchButton').click() } }

  performSearch = (query = this.state.input) => {
    const { REACT_APP_UNSPLASH } = process.env
    axios.get(`https://api.unsplash.com/search/photos/?page=1&per_page=40&query=${query}&client_id=${REACT_APP_UNSPLASH}`).then(res => {
      this.setState({ imgs: res.data.results });
    }).catch(err => {
      console.log('Error happened during fetching!', err);
    });
  };

  smallPicture() {
    this.setState({ showBig: false, selected: null, image: null, color: null, theme: null });
  }

  bigPicture(index, image) {
    this.setState({ showBig: true, selected: index, image });
    axios.put(`/api/vibrant`, { image: `${image}&auto=format&fit=crop&w=200&q=80` }).then(res => this.setState({ vibrant: res.data }));
  }

  chooseColor(color, theme) {
    this.setState({ color, theme })
  }

  changeTheme() {
    const { user_id, setTheme, setColor, setBG } = this.props
    const { image, color, theme } = this.state
    let newImage = `${image}&auto=format&fit=crop&w=1920&q=80`
    setTheme(theme);
    setColor(color);
    setBG(image);
    axios.put(`/api/unsplash/${user_id}`, { image: newImage, color, theme });
    this.props.globalToggle();
  }

  render() {
    const { color } = this.state
    const { vibrant, muted, lightVibrant, lightMuted, darkVibrant, darkMuted } = this.state.vibrant
    return (


      <div className="bgp">


        {!this.state.showBig ?
          <div className="header-wrapper">
            <h1 className="bgp-header">Customize your background</h1>
            <div className="bgp-search theme-text">
              <input onChange={(e) => this.changeHandle(e.target.value)} type="text" onKeyDown={this.keyPress} />
              <button onClick={() => this.performSearch()} id="searchButton"><i class="fas fa-search"></i></button>
            </div>
          </div>
          : null}

        <div className="bgp-images">
          {this.state.showBig ?
            this.state.showBig ?
              <div className="big-image-wrapper">
                <div className="bgp-back" onClick={() => this.smallPicture()}><i class="fas fa-caret-left"></i><a>Back</a></div>
                <div style={{ background: `url(${this.state.imgs[this.state.selected].urls.regular}) center`, backgroundSize: `cover`, borderRadius: `3px`, height: `50%`, width: `50%` }}></div>
                <div className="vibrant-picker">
                  {vibrant ? <div onClick={() => this.chooseColor(vibrant, 'dark')} style={{ background: `rgba(${vibrant})` }}></div> : null}
                  {muted ? <div onClick={() => this.chooseColor(muted, 'dark')} style={{ background: `rgba(${muted})` }}></div> : null}
                  {lightVibrant ? <div onClick={() => this.chooseColor(lightVibrant, 'dark')} style={{ background: `rgba(${lightVibrant})` }}></div> : null}
                  {lightMuted ? <div onClick={() => this.chooseColor(lightMuted, 'dark')} style={{ background: `rgba(${lightMuted})` }}></div> : null}
                  {darkVibrant ? <div onClick={() => this.chooseColor(darkVibrant, 'light')} style={{ background: `rgba(${darkVibrant})` }}></div> : null}
                  {darkMuted ? <div onClick={() => this.chooseColor(darkMuted, 'light')} style={{ background: `rgba(${darkMuted})` }}></div> : null}
                </div>
                {color ? <button onClick={() => this.changeTheme(this.state.theme)} className="background-button filled-button" style={{ background: `rgb(${this.state.color})` }}>Finalize</button> : <button>Select Theme Color</button>}
              </div>
              : null
            :
            this.state.imgs ?
              <div className="overall-wrapper" style={{ width: `100%` }}>
                <Scrollbars style={{ height: `100%`, width: `100%` }} className="thumbnail-wrapper">
                  <div className="thumbnail-wrapper" style={{ width: `100%` }}>
                    {this.state.imgs.map((val, i) => { return <div className="map-item" onClick={() => this.bigPicture(i, this.state.imgs[i].urls.raw)} key={i} style={{ background: `url(${val.urls.small}) center`, backgroundSize: `cover`, borderRadius: `3px` }}></div> })}
                  </div>
                </Scrollbars>
              </div>
              : null}
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) { return { user_id: state.user_id } };
export default connect(mapStateToProps, { setTheme, setColor, setBG })(Bgp);