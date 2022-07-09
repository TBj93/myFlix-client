import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem,  history } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;


        return (
          <Container >
          <h1>{genre.name} </h1>
          <br></br>
          <h3>{genre.description} </h3>
          <br></br>
          <Button variant="primary" type="submit"  onClick={() => { onBackClick();  }}>
                             Back
                  </Button>
</Container>
    
        )
      
      
      }
    
    
  }
