import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RegistrationView } from '../registration-view/registration-view';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import axios from 'axios';
export function ProfileView(props) {

    

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
     const [ FavoriteMovies, setFavMovies ] = useState('');
  
    ViewUser = (e) => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
      axios.get('https://tims-movie-api.herokuapp.com/users/test12345', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
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




     renderFavMovies = () => {
    console.log('test');
    console.log(FavoriteMovies.length);
          return (
            <Row className="justify-content-md-center">
    
              {FavoriteMovies.length === 0 ? (<p>no movies</p>) : (
                FavoriteMovies.map((movieId, k) => (
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
{ViewUser()}
{renderFavMovies() }

    <Form>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username : `</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

   
    
     

     

     
    </Form>
    
        </Container>
        )
  
    }