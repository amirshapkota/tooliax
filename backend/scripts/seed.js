const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Tool = require('../models/Tool');
const Banner = require('../models/Banner');

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-tools-platform', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
      w: 'majority'
    });
    console.log('Connected to MongoDB Atlas for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Tool.deleteMany({});
    await Banner.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@tooliax.com',
      password: adminPassword,
      role: 'admin',
      company: 'Tooliax'
    });
    await admin.save();
    console.log('Created admin user');

    // Create sample developers
    const developerPassword = await bcrypt.hash('dev123', 10);
    const developers = await User.insertMany([
      {
        name: 'John Smith',
        email: 'john@aitools.com',
        password: developerPassword,
        company: 'AI Innovations Inc.',
        toolsSubmitted: 2,
        toolsApproved: 2
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@techstart.com',
        password: developerPassword,
        company: 'TechStart LLC',
        toolsSubmitted: 1,
        toolsApproved: 1
      }
    ]);
    console.log('Created sample developers');

    // Create sample tools
    const sampleTools = [
      {
        name: 'ChatGPT',
        description: 'Advanced AI chatbot for conversations, content creation, and problem-solving.',
        websiteUrl: 'https://chat.openai.com',
        logoUrl: 'https://via.placeholder.com/150',
        category: 'Natural Language Processing',
        subcategory: 'Chatbots',
        pricingType: 'freemium',
        pricingPlans: [
          {
            name: 'Free',
            price: 0,
            duration: 'month',
            features: 'Limited usage, GPT-3.5, Basic support'
          },
          {
            name: 'Plus',
            price: 20,
            duration: 'month',
            features: 'Unlimited usage, GPT-4, Priority support'
          }
        ],
        features: 'Natural language processing, Code generation, Creative writing',
        useCases: 'Content creation, Customer support, Education',
        integrations: 'API, Slack, Discord',
        supportedLanguages: 'English, Spanish, French, German',
        apiAvailable: 'yes',
        freeTrialDuration: 'Free tier available',
        targetAudience: 'Developers, Writers, Students',
        tags: 'AI, chatbot, GPT, language model',
        contactEmail: 'contact@openai.com',
        developer: developers[0]._id,
        status: 'approved',
        views: 1234,
        clicks: 89,
        rating: 4.8,
        reviewCount: 156
      },
      {
        name: 'Midjourney',
        description: 'AI art generator that creates stunning images from text descriptions.',
        websiteUrl: 'https://midjourney.com',
        logoUrl: 'https://via.placeholder.com/150',
        category: 'Image Processing',
        subcategory: 'Image Generation',
        pricingType: 'paid',
        pricingPlans: [
          {
            name: 'Basic',
            price: 10,
            duration: 'month',
            features: '200 images/month, General commercial use'
          },
          {
            name: 'Standard',
            price: 30,
            duration: 'month',
            features: 'Unlimited images, Stealth mode, Priority queue'
          }
        ],
        features: 'Image generation, Art creation, Style transfer',
        useCases: 'Art, Design, Marketing, Concept art',
        integrations: 'Discord, API',
        supportedLanguages: 'English',
        apiAvailable: 'yes',
        freeTrialDuration: 'Limited free generations',
        targetAudience: 'Artists, Designers, Marketers',
        tags: 'AI, art, image generation, creativity',
        contactEmail: 'support@midjourney.com',
        developer: developers[1]._id,
        status: 'approved',
        views: 2156,
        clicks: 145,
        rating: 4.7,
        reviewCount: 98
      },
      {
        name: 'GitHub Copilot',
        description: 'AI-powered code completion and assistance for developers.',
        websiteUrl: 'https://github.com/features/copilot',
        logoUrl: 'https://via.placeholder.com/150',
        category: 'AI for Developers',
        subcategory: 'Code Generation',
        pricingType: 'paid',
        pricingPlans: [
          {
            name: 'Individual',
            price: 10,
            duration: 'month',
            features: 'AI code completion, Chat support, CLI assistance'
          },
          {
            name: 'Business',
            price: 19,
            duration: 'month',
            features: 'Everything in Individual, Policy management, Audit logs'
          }
        ],
        features: 'Code completion, AI pair programming, Multi-language support',
        useCases: 'Coding, Development, Code review, Learning',
        integrations: 'VS Code, GitHub, JetBrains, Neovim',
        supportedLanguages: 'Python, JavaScript, Java, C++, Go, Rust',
        apiAvailable: 'no',
        freeTrialDuration: '30 days',
        targetAudience: 'Developers, Programmers',
        tags: 'AI, coding, development, GitHub',
        contactEmail: 'copilot@github.com',
        developer: developers[0]._id,
        status: 'pending',
        views: 0,
        clicks: 0,
        rating: 0,
        reviewCount: 0
      }
    ];

    await Tool.insertMany(sampleTools);
    console.log('Created sample tools');

    // Create sample banners
    const sampleBanners = [
      {
        type: 'top',
        title: '🚀 Special Offer: Get 50% off Premium AI Tools',
        description: '',
        ctaText: 'Claim Now',
        ctaLink: 'https://example.com/promotion',
        backgroundColor: '#4628dd',
        textColor: 'white',
        isActive: true,
        priority: 1
      },
      {
        type: 'content',
        title: '🎯 Boost Your Productivity with AI',
        description: 'Join thousands of professionals using AI tools to streamline their workflow.',
        ctaText: 'Get Started Free',
        ctaLink: 'https://example.com/signup',
        backgroundColor: '#6e3ce7',
        textColor: 'white',
        isActive: true,
        priority: 0
      }
    ];

    await Banner.insertMany(sampleBanners);
    console.log('Created sample banners');

    console.log('\n=== Seeding completed successfully! ===');
    console.log('Admin credentials:');
    console.log('Email: admin@tooliax.com');
    console.log('Password: admin123');
    console.log('\nDeveloper credentials:');
    console.log('Email: john@aitools.com or sarah@techstart.com');
    console.log('Password: dev123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;