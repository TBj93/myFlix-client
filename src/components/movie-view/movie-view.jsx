import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem,  history } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './movie-view.scss'
import { Link } from "react-router-dom";
export class MovieView extends React.Component {
    render() {
        const { director, movie, onBackClick } = this.props;
    
  

        
        return (


<Container>
<Navbar bg="primary" expand="xl">
  <Container>
    <Navbar.Brand href="#home">Welcome to MyFlix</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.2">Info</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


         
       

          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.imagePath} />
            </div>
            <div className="movie-title">
              <span className="label">Title:  </span>
              <span className="value">{movie.title}</span>
            </div>
           < br></br>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.description}</span>
            </div>
            < br></br>
            <div className="movie-director">
              <span className="label">Director:  </span>
              <span className="value">{movie.director.name}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre:  </span>
              <span className="value">{movie.genre.name}</span>
            </div>

    
            <br></br>
              <Form>
          
               <Link to={`/directors/${movie.director.name}`}>
              <Button variant="primary" >
                    Learn more about  {movie.director.name}
                </Button>
                    </Link>
                  <br></br>
                  <br></br>

             

                  <Link to={`/genres/${movie.genre.name}`}>
              <Button variant="primary" >
                     Learn more about  {movie.genre.name}
                </Button>
                    </Link>
              
                    <br></br>
                   <br></br>
              <Button variant="primary" type="submit"  onClick={() => { onBackClick();  }}>
                             Back
                  </Button>
                   </Form>


            
            </div>
      
          
          </Container>
        );
      }
    }

    MovieView.propTypes = {
      movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
      }).isRequired,
      onMovieClick: PropTypes.func.isRequired
    };