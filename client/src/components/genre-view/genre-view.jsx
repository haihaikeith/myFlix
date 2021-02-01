import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './genre-view.scss'

import { Link } from "react-router-dom";

export class GenreView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { movies, Genre } = this.props;

    if (!movies) return null;

    return (
      <div className="genre-view">
        <Container className="genre-card">
          <Col>
            <Card style={{ width: '20rem', margin: '15px' }}>
              <Card.Body>
                <Card.Title><h1>{props.movies.genre.name}</h1></Card.Title>
                <Card.Text>{props.genre.description}</Card.Text>
                <br></br>
                <br></br>
                <Link to='/'>
                  <Button variant="link" variant="dark">Back</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    )
  }
}