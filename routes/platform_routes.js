var express = require('express');
var router = express.Router();

const gifyControllers = require('../controllers/gify_tenor');
const url_findControllers = require('../controllers/url_find');
const url_deleteControllers = require('../controllers/url_delete');

router.post('/scenarios',gifyControllers.gify_tenor);
router.get('/get',url_findControllers.find)
router.delete('/delete',url_deleteControllers.delete);



module.exports = router;