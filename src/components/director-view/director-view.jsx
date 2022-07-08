import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem,  useHistory } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './movie-view.scss'
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
    
        return (
           <Container>
       
     

          <div className="director-view">
           
            <div className="director-name">
              <span className="label">Name:  </span>
              <span className="value">{movie.Director.Name}</span>
            </div>
            <div className="movie-description">
              <span className="label"><br></br>Description: </span>
              <span className="value">{movie.Director.Description}</span>

              <Form>
                 

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
