import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function NavbarView({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Container>
      <Navbar bg="primary" expand="lg">
        <Container className="navbar-container">
          <Navbar.Brand as={Link} to={"/"} href="#home">Welcome to MyFlix</Navbar.Brand>

          <Nav className="me-auto navbar-elements__style">

            {isAuth() && (
              <Nav.Link as={Link} to={`/`}>Home</Nav.Link>
            )}

            {isAuth() && (
              <Nav.Link as={Link} to={`/users/${user}`}>Profile</Nav.Link>
            )}

            {isAuth() && (
              <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
            )}

            {!isAuth() && (
              <Nav.Link as={Link} to={`/`}>Login</Nav.Link>
            )}

            {!isAuth() && (
              <Nav.Link as={Link} to={`/register`}>Register</Nav.Link>
             
            )}
           


          </Nav>

        </Container>
      </Navbar>
    </Container>

  )
}