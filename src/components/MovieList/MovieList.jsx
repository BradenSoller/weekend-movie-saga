import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { Router } from 'react-router-dom/cjs/react-router-dom';
Router
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';




function MovieList() {

 
  const history = useHistory()
  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);
  const movieClickedOn = useSelector(store => store.movieClicked);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);


  const ShowDetails = (title,poster,description) => {
   
    dispatch({
      type: "CLICKED_MOVIE",
      payload: {title:title, poster:poster, description: description}
    })

     history.push("./details")
   
  }

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
              <img onClick={() => ShowDetails(movie.title, movie.poster, movie.description)} src={movie.poster} alt={movie.title} />
            </div>
          );
        })}
      </section>
    </main>

  );
}


export default MovieList;
