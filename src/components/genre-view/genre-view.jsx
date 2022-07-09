import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem,  history } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
export class GenreView extends React.Component {
  render() {
    const {genreMovies, genre, onBackClick } = this.props;


        return (
          <Container >
          <h1>{genre.name} </h1>
          <br></br>
          <h3>{genre.description} </h3>
          <br></br>

          <h3> See all movies with this genre:   </h3>
               <br></br>
          <Row className="justify-content-center mt-3">
          {genreMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie}>
              {movie.title}
            </MovieCard>
          ))}
           </Row>


          <Button variant="primary" type="submit"  onClick={() => { onBackClick();  }}>
                             Back
                  </Button>
                  </Container>
    
        )     
      }
       
  }
