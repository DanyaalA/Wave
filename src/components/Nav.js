import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faExpand,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const Nav = ({
  libraryStatus,
  setLibraryStatus,
  fullscreenStatus,
  setFullscreenStatus,
}) => {
  return (
    <nav>
      <h1>Waves</h1>
      <div className="menus">
        <button onClick={() => setLibraryStatus(!libraryStatus)}>
          Library
          <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
        </button>
        <button onClick={() => setFullscreenStatus(!fullscreenStatus)}>
          Fullscreen
          <FontAwesomeIcon
            icon={fullscreenStatus ? faCompress : faExpand}
          ></FontAwesomeIcon>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
