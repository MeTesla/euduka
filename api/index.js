const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/env')

const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
const router = require('./routes/routeEleve')
const firebaseRouter = require('./routes/firebaseRoutes')

app.use(cors({
    origin: config.CORS_ORIGINS
}))

app.use('/', router)
app.use('/api/firebase', firebaseRouter)

// EJS disabled for Vercel serverless - uncomment if needed locally
// app.set('view engine', 'ejs');

// Admin login route - uncomment if needed locally
// app.get('/client/euduka/admin', (req, res) => {
//     res.render('login_admin');
// });

module.exports = app;