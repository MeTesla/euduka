module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
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
    const snapshot = await db.ref('suggestions').once('value')
    const suggestions = snapshot.val() || {}

    return res.status(200).json({
      success: true,
      data: suggestions,
      count: Object.keys(suggestions).length
    })
  } catch (error) {
    console.error('Firebase fetch error:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching suggestions',
      error: error.message
    })
  }
}
