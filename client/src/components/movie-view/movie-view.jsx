import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link to={`/Genre/${movie.Genre.Name}`}>
            <Button variant="link" variant="dark"><span className="value">{movie.Genre.Name}</span></Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/Director/${movie.Director.Name}`}>
            <Button variant="link" variant="dark"><span className="value">{movie.Director.Name}</span></Button>
          </Link>
        </div>
        <Link to="/">
          <Button className="back-button" variant="link" variant="dark">Back</Button>
        </Link>
      </div>
    );
  }
}