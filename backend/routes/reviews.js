const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Tool = require('../models/Tool');

const router = express.Router();

// Submit review (public)
router.post('/', [
  body('tool').isMongoId().withMessage('Valid tool ID is required'),
  body('reviewerName').notEmpty().withMessage('Name is required'),
  body('reviewerEmail').isEmail().withMessage('Valid email is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isLength({ min: 10 }).withMessage('Comment must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tool, reviewerName, reviewerEmail, rating, comment } = req.body;

    // Check if tool exists and is approved
    const existingTool = await Tool.findOne({ _id: tool, status: 'approved' });
    if (!existingTool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    // Check if user already reviewed this tool
    const existingReview = await Review.findOne({
      tool,
      reviewerEmail
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this tool' });
    }

    // Create review
    const review = new Review({
      tool,
      reviewerName,
      reviewerEmail,
      rating,
      comment
    });

    await review.save();

    // Update tool rating
    const reviews = await Review.find({ tool, isApproved: true });
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await Tool.findByIdAndUpdate(tool, {
      rating: Math.round(averageRating * 10) / 10,
      reviewCount: reviews.length
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get reviews for a tool (public)
router.get('/tool/:toolId', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const reviews = await Review.find({
      tool: req.params.toolId,
      isApproved: true
    })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Review.countDocuments({
      tool: req.params.toolId,
      isApproved: true
    });

    res.json({
      reviews,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;