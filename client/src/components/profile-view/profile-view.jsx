import React from 'react';
import Button from 'react-bootstrap';
import Col from 'react-bootstrap';
import Container from 'react-bootstrap';
import { User } from '../../../../models';
// import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { Profile, users, } = this.props;

    return (
      <div className="profile-view">
        <Container className="profile-card">
          <Col>
            <Card style={{ width: '20rem', margin: '100px' }}>
              <Card.Body>
                <Card.Title><h1>Hello {users.Username}!</h1></Card.Title>
                <br></br>
                <Card.Text>Welcome back!</Card.Text>

                <Link to='/'>
                  <Button variant="link" variant="dark">Home</Button>
                </Link>
                <Col className="favorites">

                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    )
  }
}