const { getAll, create, getOne, remove, update } = require('../controllers/actors.controllers');
const express = require('express');

const actorsRouter = express.Router();

actorsRouter.route('/')
    .get(getAll)
    .post(create);

actorsRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = actorsRouter;