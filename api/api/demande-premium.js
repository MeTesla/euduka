const { demandePremium } = require('../controllers/controllerEleve')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
  return demandePremium(req, res)
}
