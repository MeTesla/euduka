module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { username } = req.body

  if (!username) {
    return res.status(400).json({
      success: false,
      message: 'Username is required'
    })
  }

  try {
    const admin = require('firebase-admin')

    if (!process.env.FIREBASE_DATABASE_URL) {
      return res.status(503).json({
        success: false,
        message: 'Firebase service not configured'
      })
    }

    let serviceAccount
    try {
      serviceAccount = require('../config/firebase-service-account.json')
    } catch (e) {
      return res.status(503).json({
        success: false,
        message: 'Firebase service account file not found'
      })
    }

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      })
    }

    const db = admin.database()
    const snapshot = await db.ref(`userList/${username}`).once('value')

    if (!snapshot.exists()) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const userData = snapshot.val()

    if (userData.username !== username) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User authenticated successfully',
      user: {
        username: userData.username
      }
    })
  } catch (error) {
    console.error('Firebase authentication error:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication',
      error: error.message
    })
  }
}
