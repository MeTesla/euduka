const { freeMins } = require('../controllers/controllerEleve')
const addFreeMinsMiddleware = require('../middlewares/addFreeMinsMiddleware')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
  return addFreeMinsMiddleware(req, res, () => freeMins(req, res))
}
