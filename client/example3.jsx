//JSX to be built by webpack. See React Functional Component demo.
const React = require('react');
const {createRoot} = require('react-dom/client');
const { useState, useEffect } = React;

const SongContainer = (props) => {
    const [songs, setSongs] = useState(props.songs);

    useEffect(async () => {
        const response = await fetch('/getSongs');
        const songs = await response.json();
        setSongs(songs);
    }, []);

    if(songs.length === 0) {
        return (
            <div>
                <h3>No Songs Yet!</h3>
            </div>
        );
    }

    const songList = songs.map((song) => {
        return (
            <div key={song.title}>
                <h2>{song.artist} - <i>{song.title}</i></h2>
            </div>
        );
    });

    return(
        <div>
            <h1>My favorite songs!</h1>
            {songList}
        </div>
    )
}

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<SongContainer songs={[]} />);
}

window.onload = init;