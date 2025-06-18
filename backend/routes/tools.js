const express = require('express');
const { body, validationResult } = require('express-validator');
const Tool = require('../models/Tool');
const User = require('../models/User');
const Review = require('../models/Review');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Submit new tool (developers only)
router.post('/submit', auth, [
  body('name').notEmpty().withMessage('Tool name is required'),
  body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('websiteUrl').isURL().withMessage('Valid website URL is required'),
  body('logoUrl').isURL().withMessage('Valid logo URL is required'),
  body('contactEmail').isEmail().withMessage('Valid contact email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const toolData = {
      ...req.body,
      developer: req.user._id
    };

    const tool = new Tool(toolData);
    await tool.save();

    // Update user's tool count
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { toolsSubmitted: 1 }
    });

    res.status(201).json({
      message: 'Tool submitted successfully',
      tool
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all approved tools (public)
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      subcategory,
      pricing,
      search,
      sortBy = 'createdAt'
    } = req.query;

    const query = { status: 'approved' };

    // Apply filters
    if (category && category !== 'all') {
      query.category = new RegExp(category, 'i');
    }
    if (subcategory && subcategory !== 'all') {
      query.subcategory = subcategory;
    }
    if (pricing && pricing !== 'all') {
      query.pricingType = pricing;
    }
    if (search) {
      query.$text = { $search: search };
    }

    // Sort options
    let sortOption = {};
    switch (sortBy) {
      case 'popularity':
        sortOption = { views: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'name':
        sortOption = { name: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const tools = await Tool.find(query)
      .populate('developer', 'name company')
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Tool.countDocuments(query);

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

// Get tool by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id)
      .populate('developer', 'name company');

    if (!tool || tool.status !== 'approved') {
      return res.status(404).json({ message: 'Tool not found' });
    }

    // Increment view count
    await Tool.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.json(tool);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Track tool click (public)
router.post('/:id/click', async (req, res) => {
  try {
    await Tool.findByIdAndUpdate(req.params.id, { $inc: { clicks: 1 } });
    res.json({ message: 'Click tracked' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get developer's tools
router.get('/developer/my-tools', auth, async (req, res) => {
  try {
    const tools = await Tool.find({ developer: req.user._id })
      .sort({ createdAt: -1 });

    res.json(tools);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update tool (developers only - their own tools)
router.put('/:id', auth, async (req, res) => {
  try {
    const tool = await Tool.findOne({
      _id: req.params.id,
      developer: req.user._id
    });

    if (!tool) {
      return res.status(404).json({ message: 'Tool not found or access denied' });
    }

    Object.assign(tool, req.body);
    await tool.save();

    res.json({
      message: 'Tool updated successfully',
      tool
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;