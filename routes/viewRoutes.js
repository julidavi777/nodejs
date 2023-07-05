const express = require('express');
const viewsController = require('../controllers/viewsController')
const authController = require('../controllers/authController')
// const authController = require('../controller/authController')
const router = express.Router()

// router.use(authController.isLoggedIn); 
router.get('/', viewsController.getOverview)
router.get('/tour/:slug',authController.protect,viewsController.getTour)
router.get('/login', viewsController.getLoginForm)
router.get('/signup', viewsController.getSignUpForm)
  
module.exports = router