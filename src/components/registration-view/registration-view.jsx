import React, { useState } from 'react';
import PropTypes from 'prop-types';
export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
//submit regstration details to database here
  };

  return (
    <Container>
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Welcome to MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Register</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Info</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    
    
    
    
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username" />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
    
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    
        </Container>
  );
}
RegistrationView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
  };