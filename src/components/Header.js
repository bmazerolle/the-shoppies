import React from "react";
import FlyoutContainer from "./FlyoutContainer"

const Header = (props) => {
  return (
    <header className="App-header">
      <div className="header-logo"></div>
      <h2>{props.text}</h2>
    </header>
  );
};

export default Header;