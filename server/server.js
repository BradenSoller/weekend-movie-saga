const express = require('express');
const app = express();
const movieRouter = require('./routes/movie.router.js')
const genreRouter = require('./routes/genre.router.js')
const port = process.env.PORT || 5001;

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/movies', movieRouter);
app.use('/api/genres', genreRouter)

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});
