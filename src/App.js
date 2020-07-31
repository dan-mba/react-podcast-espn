import React, { Component } from 'react';

import './App.css';
import axios from 'axios';
import Podcasts from './Podcasts.js';
import ReactPlayer from 'react-player/file';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rss: [],
      isLoaded: false,
      url: "",
      selected: -1,
      playing: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(url, selected, e) {
    console.log(url);
    this.setState(
      {
        url: url,
        playing: true,
        selected: selected
      });
  }

  /* Retrieve the JSON version of the RSS feed from the back-end & overcome CORS  */
  componentDidMount() {
    axios.get("https://flannel-glade.glitch.me", {
      params: {
        rss: "http://www.espn.com/espnradio/feeds/rss/podcast.xml?id=2942325"
      }
    })
    .then((response) => {
      this.setState({
        rss: response.data.rss,
        isLoaded: true
      });
    })
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="App">
          <div>Loading</div>
          <div className="lds-facebook"><div></div><div></div><div></div></div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="Header">
            <img src={this.state.rss.channel.image.url} alt=""></img>
            <div className="HeaderText">
              <div className="Title">{this.state.rss.channel.title}</div>
              <div>{this.state.rss.channel.description}</div>
            </div>
          </div>

          <ReactPlayer className="mediaPlayer" url={this.state.url} 
            playing={this.state.playing} height="40px" width="100%"
            config={{
              forceAudio: true,
              attributes: {
                height: "40px",
                width: "100%",
                controls: true
              },
              tracks: []
            }}/> 

          <Podcasts items={this.state.rss.channel.item} 
            clickFunc={this.handleClick}
            selected={this.state.selected}/>
        </div>
      );
    }
  }
}

export default App;
