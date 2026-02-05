const express = require('express')
const EleveModel = require('../models/EleveModel')
const jwt = require('jsonwebtoken')
const config = require('../config/env')
const ROLES = require('../config/roles')
const { SESSION_VALIDITY_MINUTES, WAIT_TIME_HOURS } = require('../config/constants')

const addFreeMinsMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    
    if (!token || token === "") return res.json({
        success: false,
        titre: 'noToken',
        message: 'Un problème est survenu. Veuillez contacter l\'Administareur',
    })

    const payload = jwt.decode(token);
    if (!payload) return res.json({
        success: false,
        titre: 'noPayload',
        message: 'Un problème est survenu. Veuillez contacter l\'Administareur',
    })

    req.userEmail = payload.email

    const email = payload.email
    const eleve = await EleveModel.findOne({ email })
    if (!eleve) return res.json({
        success: false,
        titre: 'noEleve',
        message: 'Vous n\'avez pas de compte. Veuillez vous enregistrer !',
    })

    if (eleve.role == ROLES.NON_VERIFIE) return res.json({
        success: false,
        titre: 'notVerified',
        message: 'Votre compte n\'est pas encore activé. Veuillez vérifier votre email !',
    })

    if (eleve.role === ROLES.PREMIUM) {
        return res.json({
            success: false,
            titre: 'isPremium',
            message: 'Vous êtes Premium, vous n\'avez pas besoin de minutes gratuites !',
        })
    }

    const { freeMins, dateFreeMin } = eleve
    if (freeMins <= 0) {
        return res.json({
            success: false,
            titre: 'noMoreMins',
            message: 'Vous n\'avez plus de solde minutes. Passez Premium',
        })
    }

    const now = new Date()
    function timeStamp(d) {
        return d.getTime()
    }

    if ((timeStamp(dateFreeMin) + SESSION_VALIDITY_MINUTES) > timeStamp(now)) { //true
        return res.json({
            success: false,
            titre: 'validSession',
            message: 'Votre session est encore valide !',
        })
    }

    if ((timeStamp(dateFreeMin)+ SESSION_VALIDITY_MINUTES +  WAIT_TIME_HOURS) > timeStamp(now)) {
        return res.json({
            success: false,
            titre: 'waitDay',
            message: `Vous devez attendre avant d'avoir des minutes gratuites`,
            freeMins
        })
    }
    console.log(timeStamp(dateFreeMin) + WAIT_TIME_HOURS > timeStamp(now));
    
console.log('3');

console.log('3');
    next();
}

module.exports = addFreeMinsMiddleware
