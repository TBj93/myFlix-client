import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RegistrationView } from '../registration-view/registration-view';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import axios from 'axios';
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  //define hooks
  const [usernameErr, setUsernameErr] = useState('');
 const [passwordErr, setPasswordErr] = useState('');

  const handleSubmit = (e) => {
    const isReq = validate();
    if (isReq) {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://tims-movie-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  }
  };


  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username is required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username cannot be under 6 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password is required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }
    return isReq;
  }



  return (
   




<Container>






<Form>
  <Form.Group className="mb-3" >
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
    <Form.Text className="text-muted">
        {/* code added here to display validation error */}
        {usernameErr && <p>{usernameErr}</p>}
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
  </Form.Group>
  {/* code added here to display validation error */}
  {passwordErr && <p>{passwordErr}</p>}
  <Button variant="primary" type="submit" onClick={handleSubmit}>
    Login
  </Button>
</Form>

    </Container>
    
  );
}


LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
  };