

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { useDispatch } from 'react-redux';


export default function DetailsPage() {

    const dispatch = useDispatch()
    const history = useHistory()



    const movieClickedOn = useSelector(store => store.movieClicked)
    console.log('movieclicked:', movieClickedOn);
    const Genre = useSelector(store => store.genres)
    console.log("genre:", Genre);

    const goHome = () => {


        history.push("/")

    }
    return (
        <div data-testid="movieDetails" key={movieClickedOn.id}>
           
            <h3>{movieClickedOn.title}</h3>
            <img src={movieClickedOn.poster} alt={movieClickedOn.title} />
            {
                Genre.map(movie=> {
                    return (
                        <div className='genres' data-testid='movieItem' key={movie.id}>
                            <p>{movie.name}</p>
                        </div>
                    );
                })
            }
            <p>{movieClickedOn.description}</p>
            <button data-testid="toList" onClick={goHome}>back</button>
        </div>
    )
}