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

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      directors: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount(){
    Promise.all([
      axios.get("https://tims-movie-api.herokuapp.com/movies"),
      axios.get("https://tims-movie-api.herokuapp.com/director")
  ])
  .then(response => {
    this.setState({
     movies : response[0].data,
      directors : response[1].data
    });
  
})
      .catch(error => {
        console.log(error);
      });

  }

/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

onLoggedIn(user) {
  this.setState({
    user
  });
}

  render() {

    
    const { movies, directors, selectedMovie, user } = this.state;
  
   /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
   if (!user) return <Row>
   <Col>
     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
   </Col>
 </Row>
    
  
    if (movies.length === 0) return <div className="main-view"></div>;
  
    return (
      <Container>
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
           return movies.map(m => (
              <Col  rmd={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          
    
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
            
          
        </Row>
      </Router>
            </Container>
    );
}
}

export default MainView;