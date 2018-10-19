const express = require('express');
const router = express.Router();
const exampleController = require('../controller/example-controller');

router.get('/', exampleController.getAllItem);
router.post('/add', exampleController.registerItem);

module.exports = router;