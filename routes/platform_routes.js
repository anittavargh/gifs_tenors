var express = require('express');
var router = express.Router();

const gifyControllers = require('../controllers/gify_tenor');
const url_findallControllers = require('../controllers/url_findall');
const url_findoneCOnttrollers = require('../controllers/url_findone')
const url_deleteControllers = require('../controllers/url_delete');

router.post('/scenarios',gifyControllers.gify_tenor);
router.get('/get',url_findallControllers.findall);
router.post('/getone',url_findoneCOnttrollers.findone);
router.delete('/delete',url_deleteControllers.delete);



module.exports = router;