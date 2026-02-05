const { postEmail, generateToken, prepareData } = require('../utils')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const EleveModel = require('../models/EleveModel')
const config = require('../config/env')
const ROLES = require('../config/roles')
const { SESSION_VALIDITY_MINUTES } = require('../config/constants')

const creerCompte = async (req, res) => {
    const { nom, prenom, email, tel, password, confirmPassword } = req.body
    if (!nom || !prenom || !email || !tel || !password || !confirmPassword) return res.json({
        success: false,
        titre: 'infoManquantes',
        message: 'Tous les champs sont obligatoires',
    })
    if (password.length < 4) return res.json({
        success: false,
        titre: 'motDePasseCourt',
        message: 'Le mot de passe doit contenir au moins 4 caractères',
    })
    if (password !== confirmPassword) return res.json({
        success: false,
        titre: 'motDePasseDiff',
        message: 'Les mots de passe ne correspondent pas',
    })
    const eleveExists = await EleveModel.findOne({ email })
    if (eleveExists) return res.json({
        success: false,
        titre: 'compteExiste',
        message: 'Vous êtes avez déjà un compte !'
    })


    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const token = await generateToken(email, 10) // token valide 10 minutes
    const hashedPassword = await bcrypt.hash(password, 10)
    const eleve = new EleveModel({ nom, prenom, email, tel, password: hashedPassword, role: ROLES.NON_VERIFIE, token })

    await eleve.save()

    await postEmail(req, nom, prenom, email, token, 'Bienvenue chez Euduka', 'verifier')
    return res.json({
        success: true,
        token,
        titre: "non_verifie",
        role: eleve.role,
        message: "Un mail vous a été envoyés. Pour finaliser votre inscription cliquez sur le lien du mail."
    })
}

const verifierEmail = async (req, res) => {
    const { token } = req.body
    try {
        // Verify token
        jwt.verify(token, config.SECRET_KEY)

        // Find the student with this token
        const eleve = await EleveModel.findOne({ token })

        if (!eleve) {
            return res.json({
                success: false,
                message: 'Aucun compte correspondant à ce lien de vérification.'
            })
        }

        // Update student role to 'basic'
        const newToken = await generateToken(eleve.email, SESSION_VALIDITY_MINUTES)

        const eleveUpdated = await EleveModel.findOneAndUpdate(
            { token },
            { $set: { role: ROLES.BASIC, token: newToken } },
            { new: true, runValidators: true }
        )

        return res.json({
            success: true,
            message: 'Votre email a été vérifié avec succès.',
            eleveUpdated,
            token: newToken
        })

    } catch (err) {
        // Supprimer l'élève si le token est expiré ou invalide
        await EleveModel.findOneAndDelete({ token })

        return res.json({
            success: false,
            role: ROLES.NON_VERIFIE,
            message: 'Le lien de vérification a expiré ou il est invalide. Votre pré-inscription a été annulée, veuillez recommencer.'
        })
    }
}

const annulerCompte = async (req, res) => {
    const { token } = req.body

    try {
        const eleve = await EleveModel.findOneAndDelete({ token })
        if (eleve) {
            return res.json({
                success: true,
                message: 'Votre compte a été supprimé avec succès.'
            })
        }
    } catch (error) {
        return res.json({
            succuss: false,
            message: 'Une erreur s\'était produite. Veuillez réessayer plus tard'
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.json({
        success: false,
        message: 'Email et mot de passe sont requis'
    })
    try {
        const eleve = await EleveModel.findOne({ email })
        if (!eleve) return res.json({
            success: false,
            message: 'Email ou mot de passe incorrect'
        })
        if (eleve.role === ROLES.NON_VERIFIE) return res.json({
            success: false,
            message: 'Votre compte n\'est pas encore activé. Veuillez vérifier votre email !'
        })

        const isPasswordValid = await bcrypt.compare(password, eleve.password)
        if (!isPasswordValid) return res.json({
            success: false,
            message: 'Email ou mot de passe incorrect'
        })

        const token = await generateToken(email, 1); // Token valide 4 minutes
        eleve.token = token;
        await eleve.save();

        return res.json({ eleve, success: true, titre: eleve.role })
        console.log(eleve);

    } catch (error) {
        res.json({ success: false, message: 'Erreur serveur. Veuillez réessayer plus tard' })
    }
}

const getExo = (req, res) => {
    const { exo } = req.query
    const data = prepareData(exo)
    // console.log(data);

    res.json(data)
}

const updateResultats = async (req, res) => {
    const token = req.authorization
    const result = req.body.res
    try {
        const eleve = await EleveModel.findOneAndUpdate({ token },
            {
                $set: {
                    resultats: result
                },
            },
            {
                new: true,
                runValidators: true
            }
        )
        if (!eleve) return res.json({
            success: false,
            message: 'pas d\'eleve'
        })

        res.json({ eleve, success: true })

    } catch (error) {
        res.json({
            success: false,
            message: 'Erreur serveur. Veuillez réessayer plus tard' + error.message
        })

    }
}

const freeMins = async (req, res) => {
    if (!res.headersSent) {
        const token = await generateToken(req.userEmail, 2) // token valide 2 minutes
        // --------- UPDATE DOCUMENT (opération atomique)
        const eleveUpdated = await EleveModel.findOneAndUpdate(
            { email: req.userEmail, freeMins: { $gt: 0 } },
            {
                $inc: { freeMins: -1 },
                $set: {
                    dateFreeMin: new Date(),
                    token
                },
            },
            {
                new: true,
                runValidators: true
            })

        if (!eleveUpdated) {
            return res.json({
                success: false,
                titre: 'noMoreMins',
                message: 'Vous n\'avez plus de solde minutes. Passez Premium',
                freeMins: 0
            })
        }

        return res.json({
            success: true,
            titre: 'Félicitation',
            message: 'Vous avez 10 minutes gratuites !',
            token,
            eleveUpdated
        })
    }
}

const mdpOublie = async (req, res) => {
    const { email } = req.body
    try {
        const eleve = await EleveModel.findOne({ email })
        if (!eleve) return res.json({
            success: false,
            message: 'Aucun compte associé à cet email.'
        })
        const token = await generateToken(email, 15)
        const eleveUpdated = await EleveModel.findOneAndUpdate({ email },
            {
                $set: {
                    token
                }
            },
            {
                new: true,
                runValidators: true
            }
        )
        // send email with token
        await postEmail(req, eleve.nom, eleve.prenom, email, token, 'Réinitialisation de mot de passe', 'reinitialiser')
        return res.json({
            success: true,
            message: 'Un email a été envoyé à votre adresse pour réinitialiser votre mot de passe.'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const adminLogin = async (req, res) => {
    const { email, password } = req.body
    if (email == "a@a.com" && password == "a") { // Admin credentials
        const reponse = await EleveModel.find({})
        if (req.accepts('html')) {
            return res.render('admin', { eleves: reponse });
        }
        return res.json({
            success: true,
            message: 'data sent',
            data: reponse
        })
    } else {
        if (req.accepts('html')) {
            return res.render('login_admin', { error: 'Email ou mot de passe incorrect' });
        }
        return res.json({
            success: false,
            message: 'Email ou mot de passe incorrect'
        })
    }
}

const mdpReinitialiser = async (req, res) => {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
        return res.json({
            success: false,
            message: 'Token et nouveau mot de passe requis'
        })
    }

    if (newPassword.length < 6) {
        return res.json({
            success: false,
            message: 'Le mot de passe doit contenir au moins 6 caractères'
        })
    }

    try {
        const decoded = jwt.verify(token, config.SECRET_KEY)
        const eleve = await EleveModel.findOne({ token })

        if (!eleve) {
            return res.json({
                success: false,
                message: 'Lien de réinitialisation invalide ou expiré'
            })
        }

        const newToken = await generateToken(eleve.email, 120)

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await EleveModel.findOneAndUpdate(
            { token },
            {
                $set: {
                    password: hashedPassword,
                    token: newToken
                }
            },
            { new: true, runValidators: true }
        )

        return res.json({
            success: true,
            message: 'Votre mot de passe a été réinitialisé avec succès',
            token: newToken
        })

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.json({
                success: false,
                message: 'Le lien a expiré. Veuillez refaire une demande de réinitialisation'
            })
        }
        return res.json({
            success: false,
            message: 'Erreur lors de la réinitialisation: ' + error.message
        })
    }
}

const demandePremium = async (req, res) => {
    const { numeroRecu } = req.body;
    const token = req.authorization; // Ou req.authorization selon comment votre middleware auth le gère

    // Le middleware 'auth' devrait normalement injecter l'email ou l'ID dans req
    // Mais ici on dirait que vous utilisez le token pour trouver l'élève dans updateResultats

    try {
        if (!numeroRecu || !req.file) {
            return res.json({
                success: false,
                message: 'Le numéro de reçu et l\'image sont obligatoires.'
            });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        const eleve = await EleveModel.findOneAndUpdate(
            { token: token },
            {
                $set: {
                    premiumRequest: {
                        date: new Date(),
                        numeroRecu: numeroRecu,
                        imageRecu: imagePath,
                        statut: 'en_attente'
                    },
                    role: ROLES.ATTENTE_PREMIUM
                }
            },
            { new: true }
        );

        if (!eleve) {
            return res.json({
                success: false,
                message: 'Élève non trouvé. Veuillez vous reconnecter.'
            });
        }

        res.json({
            success: true,
            message: 'Votre demande a été envoyée avec succès. Elle sera traitée sous 24h.',
            eleve
        });

    } catch (error) {
        res.json({
            success: false,
            message: 'Erreur lors de l\'envoi de la demande : ' + error.message
        });
    }
}

const validerPremium = async (req, res) => {
    const { token } = req.body; // Token de l'élève à valider
    try {
        const eleve = await EleveModel.findOneAndUpdate(
            { token: token },
            {
                $set: {
                    role: ROLES.PREMIUM,
                    'premiumRequest.statut': 'valide'
                }
            },
            { new: true }
        );

        if (!eleve) return res.json({ success: false, message: 'Élève non trouvé' });

        res.json({
            success: true,
            message: `Le compte de ${eleve.nom} est maintenant PREMIUM`,
            eleve
        });
    } catch (error) {
        res.json({ success: false, message: 'Erreur : ' + error.message });
    }
}

module.exports = {
    creerCompte,
    verifierEmail,
    login, updateResultats, freeMins,
    getExo, annulerCompte,
    mdpOublie,
    mdpReinitialiser,
    demandePremium,
    validerPremium,
    adminLogin
};