import React, { Component } from 'react';
import './Podcasts.css';

function convertDuration(time) {
  var min = Math.floor(time / 60);
  var sec = time % 60;

  return min + ":" + sec;
}

class Podcasts extends Component {
  render() {
    var arr;

    /* Only display the 10 most recent podcasts */
    if(this.props.items.length > 10) {
      arr = this.props.items.slice(0,10);
    } else {
      arr = this.props.items;
    }

    /* Map array of podcasts to JSX */
    const podcasts = arr.map((item, index) => 
      <div key={index}
        className={this.props.selected === index ? "Selected Podcast" : "Podcast"}
        onClick={(e) => this.props.clickFunc(item.enclosure.$.url, index,e)}>
        <div>{item.title}</div>
        <div className="PodDesc">
          {typeof item.description === 'object' ? item.description._ : item.description}<br/>
          ( {convertDuration(item["itunes:duration"])} )
        </div>
      </div>
    );

    return (
      <div>{podcasts}</div>
    );
  }
}

export default Podcasts;