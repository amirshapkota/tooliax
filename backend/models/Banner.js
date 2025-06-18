const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['top', 'content'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  ctaText: {
    type: String,
    required: true
  },
  ctaLink: {
    type: String,
    required: true
  },
  backgroundColor: {
    type: String,
    default: '#4628dd'
  },
  textColor: {
    type: String,
    default: 'white'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Banner', bannerSchema);