import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


class Movie extends React.Component {

  constructor(props) { 
    super(props);
    this.onRemoved = this.onRemoved.bind(this);
  }

  onRemoved() {
    this.props.onRemoved(this.props.movie);
  }

  render () {
    const poster = this.props.movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : this.props.movie.Poster;
    const imdbLink = "https://www.imdb.com/title/" + this.props.movie.imdbID;
    return (
      <div className="movie">
        <div className="nominated-movie-image">
          <img
            height="75%"
            alt={`The movie titled: ${this.props.movie.Title}`}
            src={poster}
          />
        </div>
        <div className="nominated-movie-title-div">
            <button className="remove-nomination-button" onClick={this.onRemoved}>x</button>
            <a href={imdbLink} target="_blank" className="nominated-movie-title">{this.props.movie.Title}</a>
            <div className="nominated-movie-year"> ({this.props.movie.Year})</div>
        </div>
      </div>
    )
  }
};


export default Movie;