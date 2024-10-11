// feedbackController.js

const { Feedback } = require('../models/feedback'); // Adjust the path according to your project structure

// Controller to add feedback
const addFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newFeedback = await Feedback.create({ name, email, message });
    res.status(201).json({ success: true, data: newFeedback });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to delete feedback by ID
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByPk(id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }

    await feedback.destroy();
    res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to view all feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addFeedback,
  deleteFeedback,
  getAllFeedbacks,
};
