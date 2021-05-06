import React from "react";

class MovieResult extends React.Component {

    constructor(props) {
        super(props);
        this.callNominateFunction = this.callNominateFunction.bind(this);
        var alreadyNominated = false;
        for(var i = 0; i < this.props.nominatedMovies.length; i++) {
            if(this.props.nominatedMovies[i].imdbID == this.props.movie.imdbID) alreadyNominated = true;
        }
        this.state = {
            nominated: alreadyNominated,
            maxNominations: this.props.nominatedMovies.length
        };
    }

    callNominateFunction (e) {
        e.preventDefault();
        var movieIndex = -1;
        for(var i = 0; i < this.props.nominatedMovies.length; i++) {
            if(this.props.nominatedMovies[i].imdbID === this.props.movie.imdbID) movieIndex = i;
        }

        if(movieIndex === -1 && this.props.nominatedMovies.length === 5) {
            alert("You've already nominated the maximum (5) amount of movies! \n\nYou can view your currently nominated movies by clicking the arrow on the right of your screen.");
            return;
        }

        if(movieIndex !== -1 || this.props.nominatedMovies.length !== 5) {
            var newNominations = this.props.onNominated(this.props.movie);
            this.setState({nominated: !this.state.nominated});
            this.setState({maxNominations: newNominations});
        }
    };
    
    render () {
        var imdbLink = "https://www.imdb.com/title/" + this.props.movie.imdbID;
        //update the state somehow here 
        var movieIndex = -1;
        for(var i = 0; i < this.props.nominatedMovies.length; i++) {
            if(this.props.nominatedMovies[i].imdbID === this.props.movie.imdbID) movieIndex = i;
        }
        var alreadyNominated = movieIndex !== -1;
        return (
        <div className="movie-result">
            <div className="movie-title-div">
                <a className="movie-result-title" href={imdbLink} target="_blank">{this.props.movie.Title}</a>
                <p className="movie-result-year"> ({this.props.movie.Year})</p>
            </div>
            <button className={alreadyNominated ? ("nomination-button-nominated") : this.props.nominatedMovies.length === 5 ? ("nomination-button-full") :("nomination-button")} onClick={this.callNominateFunction}>{!alreadyNominated ? "Nominate": "Nominated"}</button>
        </div>
        )
    }
};


export default MovieResult;