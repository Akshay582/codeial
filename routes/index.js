const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('The router is not fucked.');

router.get('/', homeController.home);
router.use('/users', require('./users'));

// from any further routes access comes from here
// router.use('/routerName', require('./routerfile'))

module.exports = router;