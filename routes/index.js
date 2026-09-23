const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/videogames', require('./videogames'));
router.use('/developers', require('./developers'));

module.exports = router;