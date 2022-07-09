import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';


export class DirectorView extends React.Component {
  render() {
    const {  director, directorMovies, goBack } = this.props;
    
        return (

       
          <div className="director-view">
           
            <div className="director-name">
              <span className="label">Name:  </span>
              <span className="value">{director.name}</span>
            </div>
            
          

          
              <Button variant="primary" type="submit"  onClick={() => { onBackClick();  }}>
                             Back
                  </Button>
             
        
            </div>
    

        );
      }
    }
