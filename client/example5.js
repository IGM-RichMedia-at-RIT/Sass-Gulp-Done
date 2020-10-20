const songState = {
  songs: []
};

const SongContainer = (props) => {
  if(props.songs.length === 0) {
    return (
      <div>
        <h3>No Songs Yet!</h3>
      </div>
    );
  }
  
  const songList = props.songs.map((song) => {
    return (
      <Song artist={song.artist} songTitle={song.title} />
    );
  });
  
  return (
    <div>
      <h1> My favoritest songs ever!!@! </h1>
      {songList}
    </div>
  )
};

const loadSongsFromServer = () => {
  const xhr = new XMLHttpRequest();
  
  const setSongs = () => {
    const songResponse = JSON.parse(xhr.response);
    
    songState.songs = songResponse;
    
    ReactDOM.render(
      <SongContainer songs={songState.songs} />,
      document.getElementById('app')
    );
  };
  
  xhr.onload = setSongs;
  
  xhr.open('GET', '/getSongs');
  
  xhr.send();
};

const Song = (props) => {
  return (
    <div>
      <h2>{props.artist} <i>{props.songTitle}</i></h2>
    </div>
  )
};

Song.propTypes = {
  artist: PropTypes.string.isRequired,
  songTitle: PropTypes.string.isRequired
}

const init = () => {
  ReactDOM.render(
    <SongContainer songs={[]} />,
    document.getElementById('app')
  );
  
  loadSongsFromServer();
};

window.onload = init;