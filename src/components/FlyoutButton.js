import React, { Component } from "react";
import '../App.css';
 
class FlyoutButton extends Component {
  constructor(props) { 
    super(props);
  }

  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }

    return (
      <button id="roundButton" className={visibility}
              onMouseDown={this.props.handleMouseDown}><div id="arrow-left" className={visibility}></div></button>
    );
  }
}
 
export default FlyoutButton;