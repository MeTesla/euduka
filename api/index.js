const { getExo } = require('../controllers/controllerEleve')
const checkExoAccessMiddleware = require('../middlewares/checkExoAccessMiddleware')

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
  return checkExoAccessMiddleware(req, res, () => getExo(req, res))
}
