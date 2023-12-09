

import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import { useDispatch } from 'react-redux';


export default function DetailsPage() {

    const dispatch = useDispatch()
    const history = useHistory()



    const movieClickedOn = useSelector(store => store.movieClicked)



    const goHome = () => {
        dispatch({
    type: "FETCH_MOVIES"
})

        history.push("./")

    }
    return (
        <div>
            {
                movieClickedOn && (
                    <div>
                        <p>{movieClickedOn.title}</p>
                        <img src={movieClickedOn.poster} alt={movieClickedOn.title} />
                        <p>{movieClickedOn.description }</p>


                        {/* Display other movie details here */}
                    </div>
                )
            }

            <button onClick={goHome}>back</button>
        </div>
    )

}