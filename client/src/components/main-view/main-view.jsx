import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      showRegistrationPage: false
    };
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

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  onLoggedIn(authData) {  //creates user token and sets it in localStorage on browser 
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {  // deletes user/token from browser storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  toggleRegistrationPage = () => {
    this.setState({ showRegistrationPage: !this.state.showRegistrationPage })
  }

  render() {
    const { movies, user, showRegistrationPage } = this.state;

    if (!user && !showRegistrationPage) return <LoginView toggleRegistrationPage={this.toggleRegistrationPage} onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!user && showRegistrationPage) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <div className="main-view">
          <Route exact path="/" render={() => { // goes to login view if not logged in
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} />)
          }
          } />
          <Route path="/register" render={() => <RegistrationView />} />

          <Route exact path="/" render={() => movies.map(m =>
            <MovieCard key={m._id} movie={m} />)} />
          <Route path="/Movies/:movieId" render={({ match }) =>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
          <Route path="/Director/:Name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
          }} />
          <Route path="/Genre/:Name" render={({ match }) => {
            if (!movies) return <div className="main-view" />
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
          }} />

        </div>
      </Router>
    );
  }
}