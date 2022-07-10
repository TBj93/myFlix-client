import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
  export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
  


 // define hooks
 const [usernameErr, setUsernameErr] = useState('');
 const [passwordErr, setPasswordErr] = useState('');
 const [emailErr, setEmailErr] = useState('');
 const [birthdayErr, setBirthdayErr] = useState('');

 // Vvalidation
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
   if (!email) {
     setEmailErr('Email Required');
     isReq = false;
   } else if (email.indexOf("@") === -1) {
     setEmailErr("Pleasee enter a valid email address");
     isReq = false
   }
   return isReq;
 }











    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('https://tims-movie-api.herokuapp.com/register', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
    };


  return (
    <Container>
   
    

    
    
    
    <Form>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="text" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Birthday" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    
        </Container>
  );
}
RegistrationView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
  };