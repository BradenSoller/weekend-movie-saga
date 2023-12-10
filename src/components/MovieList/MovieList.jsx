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
  const Genres = useSelector(store => store.getGenres)
  console.log("genres:", Genres);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);


  const ShowDetails = (movie) => {
   
    dispatch({
      type: "FETCH_GENRES",
      payload: movie
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
              <img data-testid="toDetails" onClick={() => ShowDetails(movie)} src={movie.poster} alt={movie.title} />
            </div>
          );
        })}
      </section>
    </main>

  );
}


export default MovieList;
