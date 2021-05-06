import {Component, React} from "react";
import Movie from "./Movie";
import "../App.css";
 
class Flyout extends Component {
  constructor(props) { 
    super(props);
    this.onRemoved = this.onRemoved.bind(this);
    this.state = {
      nominatedMovies: this.props.nominatedMovies
    }
  }

  onRemoved(movie) {
    var movieVar = movie;
    this.props.onRemoved(movie);
  }

  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }
 
    return (
      <div id="flyoutMenu" 
           className={visibility}>
        <div className="nominations-flyout-header">Your Nominations</div>
        {this.state.nominatedMovies.length === 0 ? (
            <span className="no-movies-flyout-text">No movies nominated.</span>
        ) : (
            this.state.nominatedMovies.map(function(movie, index) {
                return <Movie key={`${index}-${movie.Title}`} movie={movie} onRemoved={this.onRemoved.bind(this, movie)}/>
            }, this)
        )}
      </div>
    );
  }
}

export default Flyout;