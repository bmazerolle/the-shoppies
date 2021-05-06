import React, { Component } from "react";
import FlyoutButton from "./FlyoutButton";
import Flyout from "./Flyout";
 
class FlyoutContainer extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      visible: false,
      nominatedMovies: this.props.nominatedMovies
    };
 
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
 
  handleMouseDown(e) {
    this.toggleMenu();
    e.stopPropagation();
  }
 
  toggleMenu() {
    this.setState({visible: !this.state.visible});
  }

  onRemoved(movie) { 
    var movieVar = movie;
  }

  render () { 
    return (
        <>
            <FlyoutButton handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}/>
            <Flyout menuVisibility={this.state.visible} nominatedMovies={this.state.nominatedMovies} onRemoved={this.props.onRemoved}/>
        </>
    );
  }
}

export default FlyoutContainer;