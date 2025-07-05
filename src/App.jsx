import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Podcasts from './Podcasts';
import './App.css';

export default function App() {
  let [url, setUrl] = useState(null);
  let [selected, setSelected] = useState(-1);
  
  const { isLoading, isFetching, error, data } = useQuery({
    queryKey: ["espnPodcasts"],
    queryFn: async () =>  {
      const data = await fetch('https://rss2json-proxy-alpha.vercel.app/?' + new URLSearchParams({
        rss: 'http://www.espn.com/espnradio/feeds/rss/podcast.xml?id=2942325'
      }).toString())
      const rss = await data.json();
      return rss;
    }
  });

  const rss = data?.rss

  function handleClick(url, selectedItem) {
    setUrl(url)
    setSelected(selectedItem)
  }

  if (error) {
    return <div>{error}</div>
  }

  if (isLoading) {
    return (
      <div className="App">
        <div>Loading</div>
        <div className="lds-facebook"><div></div><div></div><div></div></div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="Header">
        <img src={rss.channel.image.url} alt=""></img>
        <div className="HeaderText">
          <div className="Title">{rss.channel.title}</div>
          <div>{rss.channel.description}</div>
        </div>
      </div>

      <div className="mediaPlayer">
        {!url ? null : <audio controls src={url} ></audio> }
      </div>

      {isFetching ? <div className="updating">Using cached podcast feed</div> : null}

      <Podcasts items={rss.channel.item} 
        clickFunc={handleClick}
        selected={selected}
      />
    </div>
  );

}
