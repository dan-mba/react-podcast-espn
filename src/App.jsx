import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/file';
import Podcasts from './Podcasts';
import './App.css';

export default function App() {
  let [rss, setRss] = useState([]);
  let [url, setUrl] = useState('');
  let [selected, setSelected] = useState(-1);
    
  function handleClick(url, selectedItem) {
    setUrl(url)
    setSelected(selectedItem)
  }

  /* Retrieve the JSON version of the RSS feed from the back-end & overcome CORS  */
  useEffect(() => {
    fetch('https://flannel-glade.glitch.me/?' + new URLSearchParams({
      rss: 'http://www.espn.com/espnradio/feeds/rss/podcast.xml?id=2942325'
    }).toString())
      .then(response => response.json())
      .then(data => setRss(data.rss))
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
          height="40px" width="100%"
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
