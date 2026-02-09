const { updateResultats } = require('../controllers/controllerEleve')
const auth = require('../middlewares/auth')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
  return auth(req, res, () => updateResultats(req, res))
}
