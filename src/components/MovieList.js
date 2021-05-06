import React from "react";
import MovieResult from "./MovieResult"
import FlyoutContainer from "./FlyoutContainer"

class MovieList extends React.Component {

    constructor(props) {
        super(props);
        this.onNominatedChanged = this.onNominatedChanged.bind(this);
        this.state = {
            movies: this.props.movies,
            nominatedMovies: this.props.nominatedMovies
        };
    }

    onNominatedChanged(movie) {
        var newNominations = this.props.onNominated(movie);
        this.setState({nominatedMovies: newNominations});
        this.setState({movies: this.props.movies});
        return newNominations;
    }

    render() { 
        return (
            <div>
                <FlyoutContainer nominatedMovies={this.state.nominatedMovies} onRemoved={this.onNominatedChanged}/>
                <div id="movie-list" className="movie-list">
                    {this.state.movies.map(function(movie, index) {
                        if(movie.Type === "movie") {
                            return <MovieResult key={`${index}-${movie.Title}`} movie={movie} onNominated={this.onNominatedChanged.bind(this, movie)} nominatedMovies={this.state.nominatedMovies} />;
                        }
                    }, this)}
                </div>
            </div>
        )
    }
};
export default MovieList;