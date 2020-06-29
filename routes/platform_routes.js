var express = require('express');
var router = express.Router();

const gifyControllers = require('../controllers/gify_tenor');

router.post('/scenarios',gifyControllers.gify_tenor);

module.exports = router;