const express = require('express');
const actorsRouter = require('./actors.router');
const directorsRouter = require('./directors.router');
const genresRouter = require('./genres.router');
const moviesRouter = require('./movies.router');
const router = express.Router();

router.use("/genres", genresRouter);
router.use("/actors", actorsRouter);
router.use("/directors", directorsRouter);
router.use("/movies", moviesRouter);

module.exports = router;