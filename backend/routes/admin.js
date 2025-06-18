const express = require('express');
const Tool = require('../models/Tool');
const User = require('../models/User');
const Review = require('../models/Review');
const { adminAuth } = require('../middleware/auth');

const adminRouter = express.Router();

// Get admin dashboard stats
adminRouter.get('/stats', adminAuth, async (req, res) => {
  try {
    const [
      pendingTools,
      totalTools,
      totalDevelopers,
      flaggedReviews,
      totalReviews
    ] = await Promise.all([
      Tool.countDocuments({ status: 'pending' }),
      Tool.countDocuments({ status: 'approved' }),
      User.countDocuments({ role: 'developer', isActive: true }),
      Review.countDocuments({ isFlagged: true }),
      Review.countDocuments()
    ]);

    res.json({
      pendingTools,
      totalTools,
      totalDevelopers,
      flaggedReviews,
      totalReviews
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get pending tools for review
adminRouter.get('/tools/pending', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const tools = await Tool.find({ status: 'pending' })
      .populate('developer', 'name email company')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Tool.countDocuments({ status: 'pending' });

    res.json({
      tools,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/Reject tool
adminRouter.patch('/tools/:id/status', adminAuth, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const tool = await Tool.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    ).populate('developer', 'name email');

    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }

    // Update developer's approved tools count if approved
    if (status === 'approved') {
      await User.findByIdAndUpdate(tool.developer._id, {
        $inc: { toolsApproved: 1 }
      });
    }

    res.json({
      message: `Tool ${status} successfully`,
      tool
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all developers
adminRouter.get('/developers', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const developers = await User.find({ role: 'developer' })
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments({ role: 'developer' });

    res.json({
      developers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get flagged reviews
adminRouter.get('/reviews/flagged', adminAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ isFlagged: true })
      .populate('tool', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Moderate review (approve/remove)
adminRouter.patch('/reviews/:id/moderate', adminAuth, async (req, res) => {
  try {
    const { action } = req.body; // 'approve' or 'remove'

    if (!['approve', 'remove'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action' });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        isFlagged: false,
        isApproved: action === 'approve'
      },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Recalculate tool rating if review was removed
    if (action === 'remove') {
      const approvedReviews = await Review.find({
        tool: review.tool,
        isApproved: true
      });

      const averageRating = approvedReviews.length > 0
        ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
        : 0;

      await Tool.findByIdAndUpdate(review.tool, {
        rating: Math.round(averageRating * 10) / 10,
        reviewCount: approvedReviews.length
      });
    }

    res.json({
      message: `Review ${action}d successfully`,
      review
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update developer status
adminRouter.patch('/developers/:id/status', adminAuth, async (req, res) => {
  try {
    const { isActive } = req.body;

    const developer = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');

    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }

    res.json({
      message: `Developer ${isActive ? 'activated' : 'deactivated'} successfully`,
      developer
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = adminRouter;