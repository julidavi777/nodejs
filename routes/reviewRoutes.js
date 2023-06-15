const express = require('express');
const app = express();
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const listEndpoints = require('express-list-endpoints');
const router = express.Router();
const routes = listEndpoints(app);

router
.route('/')
.get(reviewController.getAllReviews)
.post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
    );
    module.exports = router;
    
    console.log(routes)