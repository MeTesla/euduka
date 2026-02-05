const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../config/env')

const auth = async (req, res, next) => {
    // Bearer Token ???   
    //revoir la logie de ce middleware :

    const { authorization } = req.headers
    if (!authorization) {
        return res.json('accès interdit')
    }

    try {
        const isValidToken = jwt.verify(authorization, config.SECRET_KEY)
        if (!isValidToken) return res.json('Votre session a pris fin.')
        req.user = authorization
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json('Le token a expiré, veuillez vous reconnecter.');
        } else {
            return res.status(401).json('Token invalide');
        }
    }
    req.authorization = authorization
    next()
}

module.exports = auth