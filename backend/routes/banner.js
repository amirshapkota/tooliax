const express = require('express');
const { body, validationResult } = require('express-validator');
const Banner = require('../models/Banner');
const { adminAuth } = require('../middleware/auth');

const bannerRouter = express.Router();

// Get active banners (public)
bannerRouter.get('/active', async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true })
      .sort({ priority: -1, createdAt: -1 });

    res.json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all banners (admin only)
bannerRouter.get('/', adminAuth, async (req, res) => {
  try {
    const banners = await Banner.find()
      .sort({ createdAt: -1 });

    res.json(banners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create banner (admin only)
bannerRouter.post('/', adminAuth, [
  body('type').isIn(['top', 'content']).withMessage('Type must be top or content'),
  body('title').notEmpty().withMessage('Title is required'),
  body('ctaText').notEmpty().withMessage('CTA text is required'),
  body('ctaLink').isURL().withMessage('Valid CTA link is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const banner = new Banner(req.body);
    await banner.save();

    res.status(201).json({
      message: 'Banner created successfully',
      banner
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update banner (admin only)
bannerRouter.put('/:id', adminAuth, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.json({
      message: 'Banner updated successfully',
      banner
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle banner status (admin only)
bannerRouter.patch('/:id/toggle', adminAuth, async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    res.json({
      message: `Banner ${banner.isActive ? 'activated' : 'deactivated'} successfully`,
      banner
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete banner (admin only)
bannerRouter.delete('/:id', adminAuth, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = bannerRouter;