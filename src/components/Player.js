import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Song from "./Song";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  currentSong,
  setSongs,
  fullscreenStatus,
}) => {
  const [currentVolume, setCurrentVolume] = useState(100);

  //Event Handlers
  const playSongHanlder = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((Song) => {
      if (Song.id === nextPrev.id) {
        return {
          ...Song,
          active: true,
        };
      } else {
        return {
          ...Song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const changVolumeHandler = (e) => {
    const curVolume = e.target.value / 100;
    audioRef.current.volume = curVolume;
    setCurrentVolume(curVolume);
    console.log(curVolume);
  };

  const skipTrackhanlder = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      }

      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  //Add Styled
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const volumeAnim = {
    transform: `translateX(${currentVolume * 100}%)`,
  };

  const renderNormalSong = () => {
    console.log(fullscreenStatus);
    if (!fullscreenStatus) {
      return (
        <Song currentSong={currentSong} fullscreenStatus={fullscreenStatus} />
      );
    }
  };

  const playControlFullscreen = () => {
    if (fullscreenStatus) {
      return (
        <div className="play-control-fullscreen">
          <FontAwesomeIcon
            className="skip-back"
            onClick={() => skipTrackhanlder("skip-back")}
            size="2x"
            icon={faAngleLeft}
          />
          <FontAwesomeIcon
            onClick={playSongHanlder}
            className="play"
            size="2x"
            icon={isPlaying ? faPause : faPlay}
          />
          <FontAwesomeIcon
            className="skip-forward"
            onClick={() => skipTrackhanlder("skip-forward")}
            size="2x"
            icon={faAngleRight}
          />
        </div>
      );
    }
  };

  const playControlNormal = () => {
    if (!fullscreenStatus) {
      return (
        <div className="play-control">
          <FontAwesomeIcon
            className="skip-back"
            onClick={() => skipTrackhanlder("skip-back")}
            size="1x"
            icon={faAngleLeft}
          />
          <FontAwesomeIcon
            onClick={playSongHanlder}
            className="play"
            size="1x"
            icon={isPlaying ? faPause : faPlay}
          />
          <FontAwesomeIcon
            className="skip-forward"
            onClick={() => skipTrackhanlder("skip-forward")}
            size="1x"
            icon={faAngleRight}
          />
        </div>
      );
    }
  };

  return (
    <div class={`${fullscreenStatus ? "" : "normal-container"}`}>
      <div className={`${fullscreenStatus ? "player-fullscreen" : "player"}`}>
        {renderNormalSong()}
        <div className="time-control">
          {playControlNormal()}
          <div className="time-container">
            <p>{getTime(songInfo.currentTime)}</p>
            <div
              style={{
                background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
              }}
              className="track"
            >
              <input
                min={0}
                max={songInfo.duration}
                value={songInfo.currentTime}
                onChange={dragHandler}
                type="range"
              />
              <div style={trackAnim} className="animate-track"></div>
            </div>
            <p>{getTime(songInfo.duration)}</p>
          </div>
        </div>
        {playControlFullscreen()}
        <div className="volume-control">
          <FontAwesomeIcon
            className="skip-forward"
            size="2x"
            icon={faVolumeUp}
          />
          <div
            style={{
              background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
            }}
            className="volume"
          >
            <input
              min={0}
              max={100}
              onChange={changVolumeHandler}
              type="range"
            />
            <div style={volumeAnim} className="animate-track"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
