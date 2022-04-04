import './Podcasts.css';

function convertDuration(time) {
  var min = Math.floor(time / 60);
  var sec = ('0' + (time % 60)).slice(-2);

  return min < 60 ? `${min}:${sec}` :
    `${Math.floor(min/60) + ':' + ('0' + (min%60)).slice(-2)}:${sec}`;
}

export default function Podcasts({ items, selected, clickFunc }) {
  let arr;

  /* Only display the 10 most recent podcasts */
  if(items.length > 10) {
    arr = items.slice(0,10);
  } else {
    arr = items;
  }

  /* Map array of podcasts to JSX */
  const podcasts = arr.map((item, index) => 
    <div key={index}
      className={selected === index ? "Selected Podcast" : "Podcast"}
      onClick={(e) => clickFunc(item.enclosure.$.url, index,e)}>
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
