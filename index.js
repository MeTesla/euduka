const express = require('express')
const config = require('./config/env')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin: config.CORS_ORIGINS
}))

module.exports = app