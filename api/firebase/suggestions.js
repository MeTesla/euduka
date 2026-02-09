module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { nom, suggestion } = req.body

  if (!nom || !suggestion) {
    return res.status(400).json({
      success: false,
      message: 'Name and suggestion are required'
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

    const suggestionData = {
      nom: nom.trim(),
      suggestion: suggestion.trim(),
      timestamp: new Date().toISOString()
    }

    await db.ref(`suggestions/${nom}`).set(suggestionData)

    return res.status(201).json({
      success: true,
      message: 'Suggestion saved successfully',
      data: suggestionData
    })
  } catch (error) {
    console.error('Firebase suggestion error:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error while saving suggestion',
      error: error.message
    })
  }
}
