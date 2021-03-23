import React from "react";

const Song = ({ currentSong, fullscreenStatus }) => {
  if (fullscreenStatus) {
    return (
      <div
        className={`song-container ${
          fullscreenStatus ? "song-fullscreen" : ""
        }`}
      >
        <img src={currentSong.cover} alt={currentSong.name} />
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    );
  }

  return (
    <div
      className={`song-container ${fullscreenStatus ? "song-fullscreen" : ""}`}
    >
      <img src={currentSong.cover} alt={currentSong.name} />
      <div className="textContainer">
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    </div>
  );
};

export default Song;
