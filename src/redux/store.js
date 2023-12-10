import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import { Router } from "react-router-dom/cjs/react-router-dom.min";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_GENRES", getGenres);
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get("/api/movies");
    // Set the value of the movies reducer:
    yield put({
      type: "SET_MOVIES",
      payload: moviesResponse.data,
    });
  } catch (error) {
    console.log("fetchAllMovies error:", error);
  }
}

function* getGenres(action) {
  try {
    const response = yield axios.get(`/api/genres/${action.payload.id}`);
    yield put({ type: "SET_GENRES", payload: response.data });
    console.log("response.data", response.data);
  } catch (error) {
    console.log("Error with categories request:", error);
  }
  console.log(action);
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

const movieClicked = (state = {}, action) => {
  if (action.type === "FETCH_GENRES") {
    return action.payload;
  }
  return state;
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieClicked,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
