import React, { useReducer, useEffect } from "react";
import Cookies from 'universal-cookie';
import '../App.css';
import Header from "./Header";
import Footer from "./Footer";
import MovieList from "./MovieList";
import Search from "./Search";

const MOVIE_API_URL = "";

const initialState = {
  loading: false,
  movies: [],
  nominatedMovies: [],
  errorMessage: null,
  initial: true
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        initial: false
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
        initial: false
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
        initial: false
      };
    default:
      return state;
  }
};



const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const cookies = new Cookies();
  var nominatedCookie = cookies.get('nominatedMovies');
  state.nominatedMovies = nominatedCookie ? nominatedCookie : [];

  useEffect(() => {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});
	
      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: jsonResponse.Search
          });
        } else {
          dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: jsonResponse.Error
          });
        }
      });
	  };

    const nominated = (movie) => {
      var movieIndex = -1;
      for(var i = 0; i < state.nominatedMovies.length; i++) {
        if(state.nominatedMovies[i].imdbID === movie.imdbID) movieIndex = i;
      }
      if (movieIndex === -1) {
        state.nominatedMovies.push(movie);
      } else {
        state.nominatedMovies.splice(movieIndex, 1);
      }
      cookies.set('nominatedMovies', state.nominatedMovies, { path: '/' });
      return state.nominatedMovies;
    };

    const { nominatedMovies, movies, errorMessage, loading, initial } = state;

    return (
    <div className="App">
      <Header text="The Shoppies 2021" nominatedMovies={state.nominatedMovies}/>
      <div className="body">
        <div className="primary-body">
          {initial ? (
            <div className='homepage'>
              <div className='homepage-search'>
                <h1>The Shoppies 2021</h1>
                <div className="homepage-splitter"></div>
                <h2>Presented by Ben Mazerolle and Shopify</h2>
                <Search search={search} />
              </div>
            </div>
          ) : (
            <div className='search-page'>
              <Search search={search} />
            </div>
          )}
          <div>
            {loading && !errorMessage ? (
              <span className="loading">loading... </span>
            ) : errorMessage ? (
              <div className="errorMessage">{errorMessage}</div>
            ) : !initial ? (
              <MovieList initial={state.initial} onNominated={nominated} movies={movies} nominatedMovies={state.nominatedMovies}/>
            ) : (<></>)}
          </div>
        </div>
      </div>
      <Footer text="Ben Mazerolle - 2021" />
    </div>
  );
};

export default App;

