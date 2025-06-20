// scripts/seed.js - Database Seeding Script
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

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

    // Import models
    const User = require('../models/User');
    const Tool = require('../models/Tool');
    const Banner = require('../models/Banner');
    const Category = require('../models/Category');

    // Clear existing data
    await User.deleteMany({});
    await Tool.deleteMany({});
    await Banner.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleared existing data');

    // Create categories first
    const sampleCategories = [
      {
        name: 'AI for Developers',
        slug: 'developers',
        description: 'AI tools designed specifically for developers and programmers',
        icon: '💻',
        order: 1,
        subcategories: [
          { name: 'Code Generation', slug: 'code-generation', description: 'AI tools that generate code automatically' },
          { name: 'Debugging', slug: 'debugging', description: 'AI-powered debugging and error detection tools' },
          { name: 'API Tools', slug: 'api-tools', description: 'AI tools for API development and testing' },
          { name: 'Testing', slug: 'testing', description: 'AI-powered testing and quality assurance tools' },
          { name: 'Documentation', slug: 'documentation', description: 'AI tools for generating and maintaining documentation' },
          { name: 'Code Review', slug: 'code-review', description: 'AI-assisted code review and analysis tools' }
        ]
      },
      {
        name: 'Natural Language Processing',
        slug: 'nlp',
        description: 'AI tools for text analysis, generation, and language understanding',
        icon: '🗣️',
        order: 2,
        subcategories: [
          { name: 'Chatbots', slug: 'chatbots', description: 'Conversational AI and chatbot platforms' },
          { name: 'Translation', slug: 'translation', description: 'AI-powered language translation tools' },
          { name: 'Text Analysis', slug: 'text-analysis', description: 'Tools for analyzing and extracting insights from text' },
          { name: 'Writing Assistance', slug: 'writing-assistance', description: 'AI tools to help with writing and content creation' },
          { name: 'Grammar Check', slug: 'grammar-check', description: 'AI-powered grammar and style checking tools' },
          { name: 'Sentiment Analysis', slug: 'sentiment-analysis', description: 'Tools for analyzing emotions and opinions in text' }
        ]
      },
      {
        name: 'Image Processing',
        slug: 'image-processing',
        description: 'AI tools for image generation, editing, and analysis',
        icon: '🖼️',
        order: 3,
        subcategories: [
          { name: 'Image Generation', slug: 'image-generation', description: 'AI tools for creating images from text or other inputs' },
          { name: 'Photo Editing', slug: 'photo-editing', description: 'AI-powered photo enhancement and editing tools' },
          { name: 'Background Removal', slug: 'background-removal', description: 'Tools for automatically removing image backgrounds' },
          { name: 'Style Transfer', slug: 'style-transfer', description: 'AI tools for applying artistic styles to images' },
          { name: 'Upscaling', slug: 'upscaling', description: 'AI-powered image resolution enhancement tools' },
          { name: 'Face Recognition', slug: 'face-recognition', description: 'AI tools for detecting and analyzing faces in images' }
        ]
      },
      {
        name: 'Marketing Tools',
        slug: 'marketing',
        description: 'AI-powered marketing and business growth tools',
        icon: '📈',
        order: 4,
        subcategories: [
          { name: 'SEO Tools', slug: 'seo-tools', description: 'AI tools for search engine optimization' },
          { name: 'Social Media', slug: 'social-media', description: 'AI tools for social media management and content' },
          { name: 'Email Marketing', slug: 'email-marketing', description: 'AI-powered email marketing and automation tools' },
          { name: 'Analytics', slug: 'analytics', description: 'AI tools for marketing analytics and insights' },
          { name: 'Advertising', slug: 'advertising', description: 'AI tools for creating and optimizing advertisements' },
          { name: 'Content Creation', slug: 'content-creation', description: 'AI tools for creating marketing content' }
        ]
      },
      {
        name: 'Video Processing',
        slug: 'video',
        description: 'AI tools for video creation, editing, and analysis',
        icon: '🎥',
        order: 5,
        subcategories: [
          { name: 'Video Editing', slug: 'video-editing', description: 'AI-powered video editing and enhancement tools' },
          { name: 'Video Generation', slug: 'video-generation', description: 'AI tools for creating videos from text or other inputs' },
          { name: 'Motion Graphics', slug: 'motion-graphics', description: 'AI tools for creating animated graphics and effects' },
          { name: 'Subtitles', slug: 'subtitles', description: 'AI tools for generating and translating video subtitles' },
          { name: 'Compression', slug: 'compression', description: 'AI-powered video compression and optimization tools' },
          { name: 'Live Streaming', slug: 'live-streaming', description: 'AI tools for enhancing live video streams' }
        ]
      },
      {
        name: 'Audio Processing',
        slug: 'audio',
        description: 'AI tools for audio generation, editing, and analysis',
        icon: '🎵',
        order: 6,
        subcategories: [
          { name: 'Music Generation', slug: 'music-generation', description: 'AI tools for creating music and compositions' },
          { name: 'Voice Synthesis', slug: 'voice-synthesis', description: 'AI tools for generating synthetic speech and voices' },
          { name: 'Audio Editing', slug: 'audio-editing', description: 'AI-powered audio editing and enhancement tools' },
          { name: 'Transcription', slug: 'transcription', description: 'AI tools for converting speech to text' },
          { name: 'Sound Effects', slug: 'sound-effects', description: 'AI tools for generating and editing sound effects' },
          { name: 'Podcast Tools', slug: 'podcast-tools', description: 'AI tools specifically designed for podcast creation' }
        ]
      }
    ];

    const categories = await Category.insertMany(sampleCategories);
    console.log('Created sample categories');

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
      },
      {
        name: 'Jasper AI',
        description: 'AI writing assistant for creating marketing copy, blog posts, and content.',
        websiteUrl: 'https://jasper.ai',
        logoUrl: 'https://via.placeholder.com/150',
        category: 'Marketing Tools',
        subcategory: 'Content Creation',
        pricingType: 'paid',
        pricingPlans: [
          {
            name: 'Starter',
            price: 29,
            duration: 'month',
            features: '20,000 words, 50+ templates, Plagiarism checker'
          },
          {
            name: 'Boss Mode',
            price: 59,
            duration: 'month',
            features: 'Unlimited words, Long-form content, SEO optimization'
          }
        ],
        features: 'Content generation, Copywriting, SEO optimization, Brand voice',
        useCases: 'Marketing copy, Blog posts, Social media, Email campaigns',
        integrations: 'Chrome extension, API, Grammarly, Surfer SEO',
        supportedLanguages: 'English, Spanish, French, German, Italian',
        apiAvailable: 'yes',
        freeTrialDuration: '5 days',
        targetAudience: 'Marketers, Content creators, Businesses',
        tags: 'AI, writing, marketing, copywriting, content',
        contactEmail: 'support@jasper.ai',
        developer: developers[1]._id,
        status: 'approved',
        views: 1876,
        clicks: 234,
        rating: 4.6,
        reviewCount: 89
      },
      {
        name: 'Remove.bg',
        description: 'AI-powered background removal tool for images with one click.',
        websiteUrl: 'https://remove.bg',
        logoUrl: 'https://via.placeholder.com/150',
        category: 'Image Processing',
        subcategory: 'Background Removal',
        pricingType: 'freemium',
        pricingPlans: [
          {
            name: 'Free',
            price: 0,
            duration: 'month',
            features: '1 image, Preview quality, Personal use'
          },
          {
            name: 'Subscription',
            price: 9,
            duration: 'month',
            features: '500 images, Full resolution, Commercial use, API access'
          }
        ],
        features: 'Background removal, Bulk processing, API access, High resolution',
        useCases: 'E-commerce, Marketing, Photo editing, Social media',
        integrations: 'Photoshop, Canva, Shopify, API',
        supportedLanguages: 'English',
        apiAvailable: 'yes',
        freeTrialDuration: '1 free image',
        targetAudience: 'Designers, E-commerce, Marketers',
        tags: 'AI, image editing, background removal, photography',
        contactEmail: 'support@remove.bg',
        developer: developers[0]._id,
        status: 'approved',
        views: 987,
        clicks: 156,
        rating: 4.5,
        reviewCount: 67
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
    console.log('\nCategories created:');
    categories.forEach(cat => {
      console.log(`- ${cat.name} (${cat.slug})`);
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;