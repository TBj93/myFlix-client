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
       

          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.ImagePath} />
            </div>
            <div className="movie-title">
              <span className="label">Title:  </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label"><br></br>Description: </span>
              <span className="value">{movie.Description}</span>


              <div className="director-name">
              <span className="label">Director:  </span>
              <span className="value">{movie.Director}</span>
            </div>

              <Form>
                 
              <Link to={`/directors/:directorid`}>
                  <Button variant="link">Director</Button>
                      </Link>
                      <Link to={`/directors`}>
                  <Button variant="link">all Director</Button>
                      </Link>

              

                   <br></br>
              <Button variant="primary" type="submit"  onClick={() => { onBackClick();  }}>
                             Back
                  </Button>
                   </Form>


            
            </div>
      
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