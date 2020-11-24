import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  //Allows to login with any credentials
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };


  return (
    <Container className='registration'>
      <Form>
        <Form.Group className='registration-form'>
          <h4>Please enter the required information</h4>
          <Row>
            <Col>
              <Form.Label className='Label'>Username:</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type='text'
                placeholder='Enter Username'
              />
            </Col>
            <Col>
              <Form.Label className='Label'>Email:</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='email'
                type='email'
                placeholder='Enter Email'
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label className='Label'>Birthday:</Form.Label>
              <Form.Control
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                type='date'
                placeholder='Enter Birthday'
              />
            </Col>
            <Col>
              <Form.Label className='Label'>Password:</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Enter Password'
              />
            </Col>
          </Row>
          <Row className='Button'>
            <Col>
              <Button type='button' variant='dark' onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Container>
  );
}