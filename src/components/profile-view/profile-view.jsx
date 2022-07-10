import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RegistrationView } from '../registration-view/registration-view';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import axios from 'axios';
export function ProfileView(props) {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
     const [ favMovies, setFavMovies ] = useState('');
  
    const ViewUser = (e) => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
      axios.get('https://tims-movie-api.herokuapp.com/profile/${user}', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          // Assign the result to the state
          setUsername(response.data.Username)
          setEmail(response.data.Email)
          setFavMovies(response.data.FavoriteMovies)
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const renderFavMovies = () => {
    
    console.log(FavoriteMovies);
          return (
            <Row className="justify-content-md-center">
    
              {favMovies.length === 0 ? (<p>no movies</p>) : (
                favMovies.map((movieId, k) => (
                  <Col md={6} >
                    <MovieCard key={`${k}-${movieId}`} movie={movies.find(m => m._id == movieId)} />
                  </Col>
                ))
              )}
    
            </Row>
          )
        }
    
    return (
    <Container>

{renderFavMovies() }

    <Form>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username : `</Form.Label>
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

     
    </Form>
    
        </Container>
        )
  
    }