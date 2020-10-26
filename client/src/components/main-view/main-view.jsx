import React from 'react';
import axios from 'axios';
import { render } from 'react-dom/cjs/react-dom.development';

class MainView extends React.Component {
  constructor() {
    // call the superclass constructor
    // so react can initialize it
    super();

    // initialize the state to an empty object to destructure later
    this.state = {};
  }

  // this overrides the render() method of the superclass
  // no need to call super() it does nothing by default
  render() {
    return (
      <div className="main-view"></div>
    );
  }
}

export class MainView extends React.Component {
  // one of the "hooks" available in a react component
  componentDidMount() {
    axios.get('<my-api-endpoint/movies>')
      .then(response => {
        // assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded
    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        { movies.map(movie => (
          <div className="movie-card" key={movie._id}>{movie.Title}</div>
        ))}
      </div>
    );
  }
}