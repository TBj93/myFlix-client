import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './movie-view.scss'
export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
    
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

              <Form>
          <Button variant="primary" type="submit" onClick={() => { onBackClick(null); }}>
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