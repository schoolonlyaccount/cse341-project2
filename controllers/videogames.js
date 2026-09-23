const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const createVideoGame = async (req, res) => {
    const videoGame = {
        title: req.body.title,
        developer: req.body.developer,
        genre: req.body.genre,
        release_date: req.body.release_date,
        price: req.body.price,
        platforms: req.body.platforms,
        gameplay_type: req.body.gameplay_type
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db('project2')
            .collection('videogames')
            .insertOne(videoGame);

        if (response.acknowledged) {
            return res.status(204).send();
        }

        return res.status(500).json(
            'Some error occurred while creating the video game.'
        );
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const updateVideoGame = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid video game id to update a video game.');
    }

    const videoGameId = new ObjectId(req.params.id);

    const videoGame = {
        title: req.body.title,
        developer: req.body.developer,
        genre: req.body.genre,
        release_date: req.body.release_date,
        price: req.body.price,
        platforms: req.body.platforms,
        gameplay_type: req.body.gameplay_type
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db('project2')
            .collection('videogames')
            .replaceOne(
                { _id: videoGameId },
                videoGame
            );

        if (response.matchedCount === 0) {
            return res.status(404).json('Video game not found.');
        }

        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createVideoGame,
    updateVideoGame
};