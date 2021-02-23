import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
// import './movie-card.scss'

import { Link } from "react-router-dom";



export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Col>
        <Card style={{ width: '16rem', margin: '10px' }}>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link" variant="dark">Open</Button>
            </Link>
            <Link to={`/movies/Director/${movie.Director.Name}`}>
              <Button variant="link" variant="dark">Director</Button>
            </Link>
            <Link to={`/movies/Genre/${movie.Genre.Name}`}>
              <Button variant="link" variant="dark">Genre</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Image: PropTypes.string
    }),
    ImagePath: PropTypes.string.isRequired,
  })
};