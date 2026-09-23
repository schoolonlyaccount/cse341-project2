const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (collectionName) => async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db('project2')
            .collection(collectionName)
            .find()
            .toArray();

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getSingle = (collectionName) => async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid id to find this item.');
    }

    const id = new ObjectId(req.params.id);

    try {
        const result = await mongodb
            .getDatabase()
            .db('project2')
            .collection(collectionName)
            .findOne({ _id: id });

        if (!result) {
            return res.status(404).json('Item not found.');
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteItem = (collectionName) => async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid id to delete this item.');
    }

    const itemId = new ObjectId(req.params.id);

    try {
        const response = await mongodb
            .getDatabase()
            .db('project2')
            .collection(collectionName)
            .deleteOne({ _id: itemId });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        return res.status(404).json('Item not found.');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    deleteItem
};