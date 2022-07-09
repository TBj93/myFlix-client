import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { LoginView } from '../login-view/login-view';
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
   movies = response[0].data
     directors = response[1].data
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
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
           return movies.map(m => (
              <Col  rmd={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route exact path="/directors" render={() => {
           return directors.map(m => (
              <Col  rmd={3} key={m._id}>
                <DirectorView director={m} />
              </Col>
            ))
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()}/>
            </Col>
          }} />
                  
                    <Route
            path="/directors/:directorid"
            render={({ match, history }) => (
              <DirectorView
                director={
                  directors.find(
                    (d) => d.directorid === match.params.directorid
                  )
                  }
              />
            )}
          />
        </Row>
      </Router>
    );
}
}

export default MainView;