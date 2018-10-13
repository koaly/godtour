const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller')

router.get('/',userController.getAll);
router.get('/signup',userController.userSignup);


module.exports = router;