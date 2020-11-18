import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container>
      <Form>
        <h5>Please login to continue</h5>
        <Form.Group className='login'>
          <Row>
            <Col>
              <Form.Label className='Label'>Username:</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type='text'
                placeholder='Username'
              />
            </Col>
            <Col>
              <Form.Label className='Label'>Password:</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
              />
            </Col>
          </Row>
          <Row>
            <Col className='Button'>
              <Button type='button' variant='dark' onClick={handleSubmit}>
                Submit
                </Button>
            </Col>
          </Row>
          <Row><h4>Need to register?</h4></Row>
          <Col>
            <Row>
              <Button variant='link'>
                Register Here
              </Button>
            </Row>
          </Col>


        </Form.Group>
      </Form>
    </Container>
  );
}