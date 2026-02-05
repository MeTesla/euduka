const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/env')

const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/client/assets', express.static('../client/assets'))
app.use('/uploads', express.static('uploads'))

// Routes
const router = require('./routes/routeEleve')
const firebaseRouter = require('./routes/firebaseRoutes')

// Socket.IO
// const { Server } = require('socket.io')
// const http = require('http');
// const EleveModel = require('./models/EleveModel');
// const server = http.createServer(app)

// const io = new Server(server, {
//     cors: {
//         origin: config.CORS_ORIGINS
//     }
// })
app.use(cors({
    origin: config.CORS_ORIGINS
}))

app.use('/', router)
app.use('/api/firebase', firebaseRouter)


// Test EJS HTML engine.
app.set('view engine', 'ejs');

// Route GET admin login
app.get('/client/euduka/admin', (req, res) => {
    res.render('login_admin');
});

app.get("/api/test", async (req, res) => {
    try {
        await connectDB(config.MONGODB_URL);
        res.json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: "DB connection failed" });
    }
});

module.exports = app;

// server.listen(config.PORT, () => {
//     console.log(`✅ Server listening on port ${config.PORT}`);
// })


// websocket
// const djcvf = [
//     { 'question': `Maupassant est un écrivain du 20ème siècle`, 'rep': 'Faux' },
//     { 'question': `Victor Hugo est un écrivain du 19ème siècle`, 'rep': 'Vrai' },
//     { 'question': `Le dernier jour d'un condamné est paru en 1929`, 'rep': 'Faux' },
//     { 'question': `Le dernier jour d'un condamné est paru en 1829`, 'rep': 'Vrai' },
//     { 'question': `Le dernier jour d'un condamné est un roman autobiographique`, 'rep': 'Faux' },
//     { 'question': `Le dernier jour d'un condamné est un journal intime`, 'rep': 'Faux' },
//     { 'question': `Le dernier jour d'un condamné est un roman à thèse`, 'rep': 'Vrai' },
//     { 'question': `Le narrateur dans le dernier jour d'un condamné est un condamné à mort`, 'rep': 'Vrai' },
//     { 'question': `Le narrateur dans le dernier jour d'un condamné est Victor Hugo`, 'rep': 'Faux' },
//     { 'question': `Le dernier jour d'un condamné est contre la peine de mort.`, 'rep': 'Faux' },
//     { 'question': `La thse dfendue dans Le dernier jour dun condamné est labolition de la peine de mort`, 'rep': 'Faux' },
//     { 'question': `Le condamné du roman est condamné aux travaux forcés.`, 'rep': 'Faux' }
// ]
// setInterval(() => io.emit('liste', djcvf), 1000 * 60 * 5)