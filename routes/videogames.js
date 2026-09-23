const router = require('express').Router();

const universalController = require('../controllers/universal');
const videoGamesController = require('../controllers/videogames');
const validation = require('../middleware/validate');

const DataFormatRule = {
    title: 'required|string',
    developer: 'required|string',
    genre: 'required|string',
    release_date: 'required|string',
    price: 'required|numeric|min:0',
    platforms: 'required|array|min:1',
    'platforms.*': 'string',
    gameplay_type: 'required|string'
}

router.get(
    '/',
    //#swagger.tags = ['Video Games']
    universalController.getAll('videogames')
);

router.get(
    '/:id',
    //#swagger.tags = ['Video Games']
    universalController.getSingle('videogames')
);

router.post(
    '/',
    validation.saveItem(DataFormatRule),
    //#swagger.tags = ['Video Games']
    videoGamesController.createVideoGame
);

router.put(
    '/:id',
    validation.saveItem(DataFormatRule),
    //#swagger.tags = ['Video Games']
    videoGamesController.updateVideoGame
);

router.delete(
    '/:id',
    //#swagger.tags = ['Video Games']
    universalController.deleteItem('videogames')
);

module.exports = router;