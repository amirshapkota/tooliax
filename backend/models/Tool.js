const mongoose = require('mongoose');

const pricingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  features: { type: String, required: true }
});

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  websiteUrl: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  customCategory: String,
  subcategory: String,
  customSubcategory: String,
  pricingType: {
    type: String,
    enum: ['free', 'freemium', 'paid'],
    required: true
  },
  pricingPlans: [pricingPlanSchema],
  features: String,
  useCases: String,
  integrations: String,
  supportedLanguages: String,
  apiAvailable: {
    type: String,
    enum: ['yes', 'no', 'limited'],
    required: true
  },
  freeTrialDuration: String,
  targetAudience: String,
  tags: String,
  companyName: String,
  contactEmail: {
    type: String,
    required: true
  },
  socialMedia: String,
  additionalInfo: String,
  
  // System fields
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminNotes: String,
  
  // Stats
  views: {
    type: Number,
    default: 0
  },
  clicks: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search functionality
toolSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Tool', toolSchema);