/**
 * Configuration des variables d'environnement
 * Charge les variables depuis .env et fournit des valeurs par défaut
 */

require('dotenv').config();

const config = {
    // JWT Secret
    SECRET_KEY: process.env.SECRET_KEY || 'mkljaz_çè(__j',
    
    // Base de données
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://pookarim:UJyLoPjoP0UjbruY@notesapp.prtaxaf.mongodb.net/test?ssl=true&authSource=admin&w=majority',
    
    // Email
    EMAIL_USER: process.env.EMAIL_USER || 'pookarim@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'ynsl tthr kcoq hpdg',
    EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
    
    // Client URLs
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5500/client',
    
    // Server
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // CORS Origins
    CORS_ORIGINS: (process.env.CORS_ORIGINS || 'http://127.0.0.1:5500,http://localhost:3000,https://euduka.vercel.app,https://euduka.page.gd,http://localhost:5500').split(','),
    
    // Firebase (backend)
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL || '',
    FIREBASE_SERVICE_ACCOUNT_PATH: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './config/firebase-service-account.json',
};

// Valider les variables critiques
if (!config.SECRET_KEY) {
    console.warn('⚠️  WARNING: SECRET_KEY not set in .env, using default value');
}

if (!config.MONGODB_URL) {
    console.warn('⚠️  WARNING: MONGODB_URL not set in .env');
}

if (config.FIREBASE_DATABASE_URL && !config.FIREBASE_DATABASE_URL) {
    console.warn('⚠️  WARNING: FIREBASE_DATABASE_URL not set in .env (optional)');
}

if (config.NODE_ENV === 'production') {
    // En production, certaines variables sont obligatoires
    if (!process.env.SECRET_KEY) {
        throw new Error('❌ ERROR: SECRET_KEY must be set in .env for production');
    }
    if (!process.env.MONGODB_URL) {
        throw new Error('❌ ERROR: MONGODB_URL must be set in .env for production');
    }
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('❌ ERROR: EMAIL_USER and EMAIL_PASS must be set in .env for production');
    }
}

module.exports = config;
