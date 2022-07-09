import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem,  history } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
export class DirectorView extends React.Component {
  render() {
    const { director, directorMovies, onBackClick } = this.props;
    


        return (
          <Container >
          <h1>{director.name} </h1>
          <br></br>
          <br></br>
          <h3>{director.bio} </h3>
          <h3>Born: {director.birth} </h3>
               <h3> See director's movies:   </h3>
               <br></br>
          <Row className="justify-content-center mt-3">
          {directorMovies.map((movie) => (
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
