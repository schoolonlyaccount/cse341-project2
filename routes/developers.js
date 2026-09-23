const router = require('express').Router();

const universalController = require('../controllers/universal');
const developersController = require('../controllers/developers');
const validation = require('../middleware/validate');

const DataFormatRule = {
    name: 'required|string',
    country: 'required|string',
    founded: 'required|integer|min:1700',
    website: 'required|url'
};

router.get(
    '/',
    //#swagger.tags = ['Developers']
    universalController.getAll('developers')
);

router.get(
    '/:id',
    //#swagger.tags = ['Developers']
    universalController.getSingle('developers')
);

router.post(
    '/',
    validation.saveItem(DataFormatRule),
    //#swagger.tags = ['Developers']
    developersController.createDeveloper
);

router.put(
    '/:id',
    validation.saveItem(DataFormatRule),
    //#swagger.tags = ['Developers']
    developersController.updateDeveloper
);

router.delete(
    '/:id',
    //#swagger.tags = ['Developers']
    universalController.deleteItem('developers')
);

module.exports = router;