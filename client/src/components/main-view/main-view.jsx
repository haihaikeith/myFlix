import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      showRegistrationPage: false
    };
  }
  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://myflixwebapp.herokuapp.com/Movies')
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getMovies(token) {
    axios.get('https://myflixwebapp.herokuapp.com/Movies', {
      headers: { Authorization: `Bearer${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  toggleRegistrationPage = () => {
    this.setState({ showRegistrationPage: !this.state.showRegistrationPage })
  }

  render() {
    const { movies, selectedMovie, user, showRegistrationPage } = this.state;

    if (!user && !showRegistrationPage) return <LoginView toggleRegistrationPage={this.toggleRegistrationPage} onLoggedIn={user => this.onLoggedIn(user)} />;
    if (!user && showRegistrationPage) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onClick={() => this.onMovieClick(undefined)} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
          ))
        }
      </div>
    );
  }
}