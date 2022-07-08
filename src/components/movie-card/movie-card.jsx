import React from 'react';
import PropTypes from 'prop-types';
import  './movie-card.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;

    
    return (
      <Card style={{ width: '18rem',}} >
  <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title  className="movie-title">{movie.Title}</Card.Title>
          <Card.Text className="movie-description">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }}
  
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};