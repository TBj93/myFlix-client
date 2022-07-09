import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem,  history } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    


        return (
          <Container >
          <h1>{director.name} </h1>
          <br></br>
          <br></br>
          <h3>{director.bio} </h3>
          <h3>Born: {director.birth} </h3>
            
          <Button variant="primary" type="submit"  onClick={() => { onBackClick();  }}>
                             Back
                  </Button>
        
</Container>    
        )   
      }
     }
