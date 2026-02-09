const express = require('express')
const router = express.Router()

// Middlewares
const auth = require('../middlewares/auth')
const addFreeMinsMiddleware = require('../middlewares/addFreeMinsMiddleware')
const checkExoAccessMiddleware = require('../middlewares/checkExoAccessMiddleware')

// Controllers
const { creerCompte, verifierEmail, login,
    updateResultats, freeMins,
    getExo, annulerCompte,
    mdpOublie, mdpReinitialiser, demandePremium, validerPremium, adminLogin } = require('../controllers/controllerEleve')

const upload = require('../middlewares/upload')

router.post('/creer-compte', creerCompte)

router.post('/verifier-email', verifierEmail)

router.post('/annuler-compte', annulerCompte)

router.post('/login', login)

router.post('/update-resultats', auth, updateResultats)

router.post('/demande-premium', auth, upload.single('recuImage'), demandePremium)

router.post('/valider-premium', validerPremium)

router.post('/freeMins', addFreeMinsMiddleware, freeMins)

router.get('/', checkExoAccessMiddleware, getExo)

router.post('/client/euduka/admin', adminLogin)

router.post('/mdp-oublie', mdpOublie)

router.post('/mdp-reinitialiser', mdpReinitialiser)

module.exports = router
