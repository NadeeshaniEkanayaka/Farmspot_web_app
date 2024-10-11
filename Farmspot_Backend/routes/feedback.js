// feedbackRoutes.js

const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController'); // Adjust the path according to your project structure

// Route to add feedback
router.post('/addFeedback', feedbackController.addFeedback);

// Route to delete feedback by ID
router.delete('/deleteFeedback/:id', feedbackController.deleteFeedback);

// Route to get all feedbacks
router.get('/allFeedbacks', feedbackController.getAllFeedbacks);

module.exports = router;
