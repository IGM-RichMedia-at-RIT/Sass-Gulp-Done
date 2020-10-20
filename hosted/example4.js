"use strict";

var songState = {
  songs: []
};

var SongContainer = function SongContainer(props) {
  if (props.songs.length === 0) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "No Songs Yet!"));
  }

  var songList = props.songs.map(function (song) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, song.artist, " - ", /*#__PURE__*/React.createElement("i", null, song.title)));
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, " My favoritest songs ever!!@! "), songList);
};

var loadSongsFromServer = function loadSongsFromServer() {
  var xhr = new XMLHttpRequest();

  var setSongs = function setSongs() {
    var songResponse = JSON.parse(xhr.response);
    songState.songs = songResponse;
    ReactDOM.render( /*#__PURE__*/React.createElement(SongContainer, {
      songs: songState.songs
    }), document.getElementById('app'));
  };

  xhr.onload = setSongs;
  xhr.open('GET', '/getSongs');
  xhr.send();
};

var init = function init() {
  ReactDOM.render( /*#__PURE__*/React.createElement(SongContainer, {
    songs: []
  }), document.getElementById('app'));
  loadSongsFromServer();
};

window.onload = init;