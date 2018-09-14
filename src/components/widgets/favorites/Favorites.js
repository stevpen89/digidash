import React, { Component } from 'react'
import './Favorites.css'

export default class Favorites extends Component {
	constructor(){
		super()
		this.state={
			showSettings:false,
			url1:"https://www.facebook.com/",
			url2:"https://www.instagram.com",
			url3:"https://www.snapchat.com",
			url4:"https://news.google.com/?hl=en-US&gl=US&ceid=US:en",
			url5:"https://youtube.com",
			url6:"https://devmountain.com"
		}
	}

	toggleSettings(){
		this.setState({showSettings:!this.state.showSettings})
	}

	updateUrl1(val){
		this.setState({url1:val})
	}
	updateUrl2(val){
		this.setState({url2:val})
	}
	updateUrl3(val){
		this.setState({url3:val})
	}
	updateUrl4(val){
		this.setState({url4:val})
	}
	updateUrl5(val){
		this.setState({url5:val})
	}
	updateUrl6(val){
		this.setState({url6:val})
	}

	render() {
		const {url1,url2,url3,url4,url5,url6} = this.state
		return (
			<div className="favorites standard-widget">
				<div className="favorites-insert">
					<h1 className="widget-settings-button" onClick={()=>this.toggleSettings()}>...</h1>
				{this.state.showSettings?
					<div className="widget-settings">
						<div className="widget-settings-item">
							<input onChange={(e)=>this.updateUrl1(e.target.value)} placeholder={this.state.url1}/>
						</div>
						<div className="widget-settings-item">
							<input onChange={(e)=>this.updateUrl2(e.target.value)} placeholder={this.state.url2}/>
						</div>
						<div className="widget-settings-item">
							<input onChange={(e)=>this.updateUrl3(e.target.value)} placeholder={this.state.url3}/>
						</div>
						<div className="widget-settings-item">
							<input onChange={(e)=>this.updateUrl4(e.target.value)} placeholder={this.state.url4}/>
						</div>
						<div className="widget-settings-item">
							<input onChange={(e)=>this.updateUrl5(e.target.value)} placeholder={this.state.url5}/>
						</div>
						<div className="widget-settings-item">
							<input onChange={(e)=>this.updateUrl6(e.target.value)} placeholder={this.state.url6}/>
						</div>
					</div>
				:null}
				<div className="favorites-wrapper">
						<div className="favorites-container">
							<div className="item-holder">
								<a href={url1} target="_blank"><img alt="" src={`https://www.google.com/s2/favicons?domain=${url1}`}/></a>
							</div>
						</div>
						<div className="favorites-container">
							<div className="item-holder">
								<a href={url2} target="_blank"><img alt="" src={`https://www.google.com/s2/favicons?domain=${url2}`}/></a>
							</div>
						</div>
						<div className="favorites-container">
							<div className="item-holder">
								<a href={url3} target="_blank"><img alt="" src={`https://www.google.com/s2/favicons?domain=${url3}`}/></a>
							</div>
						</div>
						<div className="favorites-container">
							<div className="item-holder">
								<a href={url4} target="_blank"><img alt="" src={`https://www.google.com/s2/favicons?domain=${url4}`}/></a>
							</div>
						</div>
						<div className="favorites-container">
							<div className="item-holder">
								<a href={url5} target="_blank"><img alt="" src={`https://www.google.com/s2/favicons?domain=${url5}`}/></a>
							</div>
						</div>
						<div className="favorites-container">
							<div className="item-holder">
								<a href={url6} target="_blank"><img alt="" src={`https://www.google.com/s2/favicons?domain=${url6}`}/></a>
							</div>
						</div>
					</div>
				</div>
				<div className="theme-glow"></div>
				<div className="theme-accent"></div>
			</div>
		)
	}
}
