const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const createDeveloper = async (req, res) => {
    const developer = {
        name: req.body.name,
        country: req.body.country,
        founded: req.body.founded,
        website: req.body.website
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db('project2')
            .collection('developers')
            .insertOne(developer);

        if (response.acknowledged) {
            return res.status(204).send();
        }

        return res.status(500).json(
            'Some error occurred while creating the developer.'
        );
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const updateDeveloper = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid developer id to update a developer.');
    }

    const developerId = new ObjectId(req.params.id);

    const developer = {
        name: req.body.name,
        country: req.body.country,
        founded: req.body.founded,
        website: req.body.website
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db('project2')
            .collection('developers')
            .replaceOne(
                { _id: developerId },
                developer
            );

        if (response.matchedCount === 0) {
            return res.status(404).json('Developer not found.');
        }

        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createDeveloper,
    updateDeveloper
};