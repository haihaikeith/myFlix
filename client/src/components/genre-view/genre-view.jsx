import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './movie-card.scss'

import { Link } from "react-router-dom";

export class GenreView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { movie, Genre } = this.props;

    return (
      <div>
        <Container>
          <Col>
            <Card style={{ width: '20rem', margin: '5rem' }}>
              <Card.Body>
                <Card.Title><h1>{Genre.Name}</h1></Card.Title>
                <Card.Text>{Genre.Description}</Card.Text>
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
