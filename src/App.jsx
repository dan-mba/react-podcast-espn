import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player/file';
import Podcasts from './Podcasts';
import './App.css';

export default function App() {
  let [rss, setRss] = useState([]);
  let [url, setUrl] = useState('');
  let [selected, setSelected] = useState(-1);
  let [playing, setPlaying] = useState(false);
  
  function handleClick(url, selectedItem, e) {
    setUrl(url)
    setPlaying(true);
    setSelected(selectedItem)
  }

  /* Retrieve the JSON version of the RSS feed from the back-end & overcome CORS  */
  useEffect(() => {
    axios.get("https://flannel-glade.glitch.me", {
      params: {
        rss: "http://www.espn.com/espnradio/feeds/rss/podcast.xml?id=2942325"
      }
    })
    .then((response) => {
      setRss(response.data.rss);
    })
  }, []);

  if (rss.length === 0) {
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
          <img src={rss.channel.image.url} alt=""></img>
          <div className="HeaderText">
            <div className="Title">{rss.channel.title}</div>
            <div>{rss.channel.description}</div>
          </div>
        </div>

       <ReactPlayer className="mediaPlayer" url={url} 
          playing={playing} height="40px" width="100%"
          config={{
            forceAudio: true,
            attributes: {
              height: "40px",
              width: "100%",
              controls: true
            },
            tracks: []
          }}
        /> 

       <Podcasts items={rss.channel.item} 
          clickFunc={handleClick}
          selected={selected}/>
      </div>
    );
  }
}
