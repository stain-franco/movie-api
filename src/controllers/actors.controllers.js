const catchError = require('../utils/catchError');
const Actors = require('../models/Actors');
const Movies = require('../models/Movies');

const getAll = catchError(async(req, res) => {
    const results = await Actors.findAll({include: [Movies]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Actors.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actors.findByPk(id, {include: [Movies]});
    if(!result) return res.status(404).json({message: "Actor not found"})
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actors.destroy({ where: {id} });
    if (result === 0) return res.status(404).json({message: "Actor not found"})
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Actors.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.status(404).json({message: "Actor not found"})
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}