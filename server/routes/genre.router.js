const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const query = `
  SELECT "movies"."title", "genres"."name"
FROM "movies"
INNER JOIN "movies_genres"
ON "movies_genres"."movie_id" = "movies"."id"
INNER JOIN "genres"
ON "genres"."id" = "movies_genres"."genre_id";
  `;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
      console.log("results.rows", result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

module.exports = router;
