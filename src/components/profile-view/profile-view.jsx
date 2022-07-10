import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RegistrationView } from '../registration-view/registration-view';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import axios from 'axios';
export function ProfileView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
  



const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.get('https://tims-movie-api.herokuapp.com/user/:Username', {
      Username: username,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
   

    <Container>
    <Navbar bg="primary" expand="xl">
      <Container>
    
          <Container>
            <Navbar.Brand href="#home">Welcome to MyFlix</Navbar.Brand>
          </Container>
           
      </Container>
    </Navbar>
    
        </Container>
        
      );
    }
    