const app = require('./index')
const config = require('./config/env')

const connectDB = require('./db')

async function initializeServer() {
  if (!config.MONGODB_URL) {
    console.warn('⚠️ MONGODB_URL not configured')
    return null
  }

  try {
    await connectDB(config.MONGODB_URL)
    return app
  } catch (error) {
    console.error('Failed to connect to database:', error)
    return null
  }
}

initializeServer().then(server => {
  if (server) {
    const serverless = require('serverless-http')
    const handler = serverless(server)
    module.exports.handler = handler
  }
})
