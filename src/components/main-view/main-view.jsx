import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
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
      movies: [ ],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount(){
    axios.get('https://tims-movie-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }


  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

onLoggedIn(user) {
  this.setState({
    user
  });
}

  render() {

    
    const { movies, selectedMovie, user } = this.state;
  
   /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
   if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
   //registration view
   // return <RegistrationView />;
    
  
    if (movies.length === 0) return <div className="main-view"></div>;
  
    return (

      <Container fluid>
      
           <Navbar bg="primary" expand="lg">
            <Container>
               <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
                 <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                   <Navbar.Text>
                       Signed in as: <a href="#login">CustomUser</a>
                 </Navbar.Text>
                </Navbar.Collapse>
             </Container>
              </Navbar>

      <div className="main-view">
        {selectedMovie
        ? (
          <Row className="justify-content-md-center">
            <Col md={8}>
         <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
         </Col>
         </Row>
        )
          :( 
          <Row className="justify-content-md-center">
          { movies.map(movie => (
            <Col md={3}>
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
            </Col>
            ))}
          </Row>
          )
  }
      </div>
      </Container>
      );
}
}

export default MainView;