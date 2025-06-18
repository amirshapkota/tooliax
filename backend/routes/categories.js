const express = require('express');
const Tool = require('../models/Tool');

const categoryRouter = express.Router();

// Get all categories with tool counts
categoryRouter.get('/', async (req, res) => {
  try {
    const categories = await Tool.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          subcategories: { $addToSet: '$subcategory' }
        }
      },
      {
        $project: {
          name: '$_id',
          count: 1,
          subcategories: {
            $filter: {
              input: '$subcategories',
              cond: { $ne: ['$this', null] }
            }
          }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tools by category
categoryRouter.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const {
      page = 1,
      limit = 12,
      subcategory,
      pricing,
      search,
      sortBy = 'createdAt'
    } = req.query;

    const query = {
      status: 'approved',
      category: new RegExp(category, 'i')
    };

    // Apply filters
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
      .skip((page - 1) * limit);

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

module.exports = categoryRouter;