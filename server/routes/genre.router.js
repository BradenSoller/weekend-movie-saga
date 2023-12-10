const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/:id", (req, res) => {
  console.log('req.params:',req.params.id);
  const query = `
SELECT "genres"."id","movies"."title","movies"."poster","movies"."description", "genres"."name"
FROM "movies"
INNER JOIN "movies_genres"
ON "movies_genres"."movie_id" = "movies"."id"
INNER JOIN "genres"
ON "genres"."id" = "movies_genres"."genre_id"
WHERE "movies"."id" = ${req.params.id};
`;
  pool
    .query(query)
    .then(result => {
      console.log("results.rows", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all genres", err);
      res.sendStatus(500);
    });
  
});

module.exports = router;
