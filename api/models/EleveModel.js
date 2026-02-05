const mongoose = require('mongoose')

const elevesSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    tel: { type: String, required: true },
    password: { type: String, required: true },

    token: { type: String, unique: true },

    freeMins: { type: Number, default: 2 },
    dateFreeMin: { type: Date, default: Date.now },

    role: { type: String, enum: ['non_verifie', 'basic', 'attente_premium', 'premium'], required: true },
    premiumRequest: {
        date: { type: Date },
        numeroRecu: { type: String },
        imageRecu: { type: String },
        statut: { type: String, enum: ['en_attente', 'valide', 'refuse'], default: null }
    },
    resultats: {
        qcm: {
            score: { type: Number, default: 0 },
            scores: { type: Array, default: [] },
            nbrQsts: { type: Number, default: 0 },
            date: { type: String },
            lastSession: { type: Array, default: [] }
        },
        vf: {
            score: { type: Number, default: 0 },
            scores: { type: Array, default: [] },
            nbrQsts: { type: Number, default: 0 },
            date: { type: String },
            lastSession: { type: Array, default: [] },
        },
        remplir: {
            score: { type: Number, default: 0 },
            scores: { type: Array, default: [] },
            nbrQsts: { type: Number, default: 0 },
            date: { type: String },
            lastSession: { type: Array, default: [] },
        },
        ordrePhrases: {
            score: { type: Number, default: 0 },
            scores: { type: Array, default: [] },
            nbrQsts: { type: Number, default: 0 },
            date: { type: String },
            lastSession: { type: Array, default: [] },
        },
        ordreEvenements: {
            score: { type: Number, default: 0 },
            scores: { type: Array, default: [] },
            nbrQsts: { type: Number, default: 0 },
            date: { type: String },
            lastSession: { type: Array, default: [] },
        }
    },
    dateCreation: { type: Date, default: Date.now }
})

const EleveModel = mongoose.model('Eleve', elevesSchema)

module.exports = EleveModel
