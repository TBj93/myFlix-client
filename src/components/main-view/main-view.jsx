import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RegistrationView } from '../registration-view/registration-view';
import Navbar from 'react-bootstrap/Navbar'
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://tims-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  render() {

    
    const { movies, directors, selectedMovie, user } = this.state;
  
   /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    
  
  
  
    return (
      <Container fluid>
<Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Welcome to MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



      <Router>
        <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
  if (!user) return <Col>
    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
  </Col>
    if (movies.length === 0) return <div className="main-view"></div>;
  return movies.map(m => (
    <Col md={3} key={m._id}>
      <MovieCard movie={m} />
    </Col>
  ))
}} />
<Route path="/register" render={() => {
  return <Col>
    <RegistrationView />
  </Col>
}} />
</Row>

    
 <Row className="justify-content-md-center">
          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
            </Col>
          }} />
          </Row>
                  
          <Route
            path="/directors/:directorName"
            render={({ match, history }) => (
              <DirectorView
                director={
                  movies.find(
                    (m) => m.director.name === match.params.directorName
                  ).director  
                  
                }
                directorMovies={movies.filter(
                  (m) => m.director.name === match.params.directorName
                )}
                onBackClick={() => history.goBack()}
              />
            )}
          />

<Route
            path="/genres/:genreName"
            render={({ match, history }) => (
              <GenreView
                genre={
                  movies.find(
                    (m) => m.genre.name === match.params.genreName
                  ).genre
                }
                genreMovies={movies.filter(
                  (m) => m.genre.name === match.params.genreName
                )}
                onBackClick={() => history.goBack()}
              />
            )}
          />
            
          
    
      </Router>
            </Container>
    );
}
}

export default MainView;