import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavbarView } from '../navbar-view/navbar-view';
import { RegistrationView } from '../registration-view/registration-view';
import Navbar from 'react-bootstrap/Navbar'
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://tims-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
   

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    console.log(authData);
    this.props.setUser(authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
   
    this.props.setUser('');
  }

  
  render() {
    let { movies } = this.props;
    let { user } = this.props;
    
    const {  directors, selectedMovie } = this.state;
  
  
  
    return (
        

      <Router>
        <NavbarView user={user} />
        <Row className="main-view justify-content-md-center" md={8}>
        <Route exact path="/" render={() => {
  if (!user) return <Col>
    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
  </Col>
    if (movies.length === 0) return <div className="main-view"></div>;
    return <MoviesList movies={movies}/>;
 
}} />

</Row>
<Route path="/" />
<Route exact path="/register" render={() => {
  if (user) return <Redirect to="/" />
  return <Col>
    <RegistrationView />
  </Col>
}} />
    
 <Row className="justify-content-md-center">
          <Route path="/movies/:movieId" render={({ match, history }) => {

          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
             </Col>

            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
            </Col>
          }} />
          </Row>

          <Row className="justify-content-md-center">
          <Route path="/directors/:directorName" render={({ match, history }) => {

          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
             </Col>

            return <Col md={8}>
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
              /></Col>
          }} />
          </Row>


          <Row className="justify-content-md-center">
          <Route   path="/genres/:genreName" render={({ match, history }) => {

          if (!user) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
             </Col>

            return <Col md={8}>
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
              /></Col>
          }} />
          </Row>
     

      <Row className="justify-content-md-center">
      <Route path={`/users/${user}`} render={({match, history}) => {
                //   if (!user) return <Redirect to="/" />
                if (!user) return <LoginView
                onLoggedIn={user => this.onLoggedIn(user)} />

                     return <Col>
               <ProfileView user={user} history={history} movies={movies} onBackClick={() => history.goBack()}/>
                      </Col>
              }} />
          </Row>
          </Router>
           
    );
}
}


let mapStateToProps = store => {
  return { 
      movies: store.movies,
      user: store.user
      
  }
}


export default connect(mapStateToProps, { setMovies, setUser } )(MainView);