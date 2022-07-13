import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import { RegistrationView } from '../registration-view/registration-view';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import axios from 'axios';
export function ProfileView({ movies }) {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');
     const [ favMovies, setFavMovies ] = useState('');
  
     useEffect(() => {
      viewUser()
    }, [])


    const viewUser = (e) => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem('user');
      axios.get(`https://tims-movie-api.herokuapp.com/users/${user}`, {
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

const deleteUser = (e) => {

  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  axios.delete(`https://tims-movie-api.herokuapp.com/users/${user}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
 
  .then(response => {
    
    console.log(data);
    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
  })
  .catch(e => {
    console.log('error DELETING the user')
  });

}

    
    return (
      <div>
        <Container>
           <Form>

   
<p>   {username}'s        Favorite movies      </p>
           {renderFavMovies()}

           <br></br>
                   <br></br>
                   <Link to={`/`}>
              <Button variant="primary" >
                     Back
                </Button>
                    </Link>
                   
     
                    <br></br>
                   <br></br>

                <Button variant="primary" type="submit" onClick={deleteUser}>
        DELETE COMPLETE USER PROFILE: ARE YOU FREAKING SURE!?
      </Button>
    </Form>

    
        </Container>
        </div>
   
        )
  
    }