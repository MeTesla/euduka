const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (keys loaded from .env or service account)
// REQUIRED: npm install firebase-admin
// REQUIRED: Create service account file and set FIREBASE_DATABASE_URL in .env

let db = null;

// Initialize Firebase only if credentials are available
if (process.env.FIREBASE_DATABASE_URL) {
  try {
    // Option 1: Using service account file
    const serviceAccount = require('../config/firebase-service-account.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
    db = admin.database();
    console.log('✅ Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.warn('⚠️ Firebase not fully configured:', error.message);
    console.warn('Set up Firebase credentials in server/config/firebase-service-account.json');
  }
} else {
  console.warn('⚠️ FIREBASE_DATABASE_URL not set in .env');
}

/**
 * @route   POST /api/firebase/authenticate
 * @desc    Authenticate user by checking Firebase database
 * @access  Public
 */
router.post('/authenticate', async (req, res) => {
  try {
    // Check if Firebase is initialized
    if (!db) {
      return res.status(503).json({
        success: false,
        message: 'Firebase service not configured. Please set up credentials.'
      });
    }

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username is required'
      });
    }

    // Query Firebase Realtime Database
    const snapshot = await db.ref(`userList/${username}`).once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userData = snapshot.val();

    // Verify username matches
    if (userData.username !== username) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed'
      });
    }

    // Success
    return res.status(200).json({
      success: true,
      message: 'User authenticated successfully',
      user: {
        username: userData.username,
        // Don't expose sensitive data
      }
    });
  } catch (error) {
    console.error('Firebase authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/firebase/suggestions
 * @desc    Save user suggestions to Firebase database
 * @access  Public
 */
router.post('/suggestions', async (req, res) => {
  try {
    // Check if Firebase is initialized
    if (!db) {
      return res.status(503).json({
        success: false,
        message: 'Firebase service not configured. Please set up credentials.'
      });
    }

    const { nom, suggestion } = req.body;

    // Validation
    if (!nom || !suggestion) {
      return res.status(400).json({
        success: false,
        message: 'Name and suggestion are required'
      });
    }

    // Sanitize input (basic)
    if (nom.length > 100 || suggestion.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Input exceeds maximum length'
      });
    }

    // Save to Firebase
    const suggestionData = {
      nom: nom.trim(),
      suggestion: suggestion.trim(),
      timestamp: new Date().toISOString()
    };

    await db.ref(`suggestions/${nom}`).set(suggestionData);

    return res.status(201).json({
      success: true,
      message: 'Suggestion saved successfully',
      data: suggestionData
    });
  } catch (error) {
    console.error('Firebase suggestion error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while saving suggestion',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/firebase/suggestions
 * @desc    Get all suggestions (admin only)
 * @access  Private (should add auth middleware)
 */
router.get('/suggestions', async (req, res) => {
  try {
    // Check if Firebase is initialized
    if (!db) {
      return res.status(503).json({
        success: false,
        message: 'Firebase service not configured. Please set up credentials.'
      });
    }

    const snapshot = await db.ref('suggestions').once('value');
    const suggestions = snapshot.val() || {};

    return res.status(200).json({
      success: true,
      data: suggestions,
      count: Object.keys(suggestions).length
    });
  } catch (error) {
    console.error('Firebase fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching suggestions',
      error: error.message
    });
  }
});

module.exports = router;
