import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './movie-card.scss'

import { Link } from "react-router-dom";



export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

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
            <Link to={`/Director/${movie.Director.Name}`}>
              <Button variant="link" variant="dark">Director</Button>
            </Link>
            <Link to={`/Genre/${movie.Genre.Name}`}>
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
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};