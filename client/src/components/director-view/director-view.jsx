import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './director-view.scss';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, Director } = this.props;

    if (!Director) return null;

    return (
      <div className="director-view">
        <Container className="directer-card">
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title>{movies.Director.Name}</Card.Title>
              <Card.Img variant="top" src={Director.Image} />
              <Card.Text>Bio: {movies.Director.Bio}</Card.Text>
              <Link to={`/`}>
                <Button variant="link">Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}