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
  let user = localStorage.getItem('user');
  let token = localStorage.getItem('token');
  e.preventDefault();
  axios.delete(`https://tims-movie-api.herokuapp.com/deregister/${user}`, {
  
   headers: {
      Authorization: 'Bearer ' + token
    }
  }).then(response => {
    alert('profile has been deleted');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log(data);
    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
  })
  .catch(e => {
    console.log('error deleting the user')
  });

}

const handleSubmit = (e) => {

  e.preventDefault();
  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  axios.put(`https://tims-movie-api.herokuapp.com/update/${user}`, {
      Username: username,
      Email: email, //Email is a variable which holds the email
      Birthday: birthday,
      Password: password
    },
      {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then(response => {
    alert(' profile has been updated');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log(data);
    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
  
  }) .catch(e => {
    console.log('error updating user info')
  });

};

    
    return (
      <div>
        <Container>
           <Form>


   <div className="favMovieHeader">
   <span className="label">{username}'s        Favorite Movies: </span>

           {renderFavMovies()}

           <br></br>
                   <br></br>
                   <Link to={`/`}>
              <Button variant="primary" >
                     Back
                </Button>
                   </Link>
     </div>    
     
                    <br></br>
                   <br></br>




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
        Update Userdata
      </Button>

      <br></br>
                   <br></br>

                <Button variant="primary" type="submit" onClick={deleteUser}>
       WARNING: Clicking will delete the user profile
      </Button>
    </Form>

    
        </Container>
        </div>
   
        )
  
    }