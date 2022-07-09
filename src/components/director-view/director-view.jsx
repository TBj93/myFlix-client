import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem,  history } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { directors, director, onBackClick } = this.props;
    
        return (

          <div className="director-view">           
            <div className="director-name">
              <span className="label">Name:  </span>
              <span className="value">{director.Name}</span>
            </div>
            <div className="director-description">
              <span className="label">Description:  </span>
              <span className="value">{director.Bio}</span>
            </div>
            <div className="director-birth">
              <span className="label">Birth:  </span>
              <span className="value">{director.Birth}</span>
            </div>
            <div className="director-id">
              <span className="label">ID:  </span>
              <span className="value">{director.directorid}</span>
            </div>
            
      
            
          

          
            <Button variant="primary" type="submit"  onClick={() => { onBackClick();  }}>
                             Back
                  </Button>
        
            </div>
    

        );
      }
    }
