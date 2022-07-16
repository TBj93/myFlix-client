import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Form, Button, Navbar, Nav, NavItem, NavDropdown, MenuItem,  history } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './movie-view.scss'
import axios from 'axios';
import { Link } from "react-router-dom";
export class MovieView extends React.Component {


  constructor(props) {
    super(props);

  }

  removeFavoriteMovie() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.delete(`https://tims-movie-api.herokuapp.com/${user}/remove/${this.props.movie._id}`,{
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        alert(`Removed from list`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  render() {
        const { director, movie, onBackClick } = this.props;
       
        return (

<Container>         
       

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

                <Button variant="primary"  value={movie._id} onClick={(e) => this.removeFavoriteMovie(e, movie)}>
                Remove from Favorites' list
                </Button>
         

                    <br></br>
                   <br></br>
                   <Link to={`/`}>
              <Button variant="primary" >
                     Back
                </Button>
                    </Link>
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
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
          Name: PropTypes.string.isRequired
        })
      }).isRequired,
      onMovieClick: PropTypes.func.isRequired
    };