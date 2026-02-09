# Euduka API - Vercel Serverless Deployment

## Configuration pour Vercel

### 1. Variables d'environnement sur Vercel

Dans les paramètres de votre projet Vercel, ajoutez les variables suivantes:

```
MONGODB_URL=votre_url_mongodb
SECRET_KEY=votre_cle_secrete_jwt
EMAIL_USER=votre_email
EMAIL_PASS=votre_mot_de_passe_app
EMAIL_SERVICE=gmail
CLIENT_URL=https://votre-domaine-client
CORS_ORIGINS=https://votre-domaine.vercel.app,http://localhost:3000,http://127.0.0.1:5500
FIREBASE_DATABASE_URL=votre_url_firebase (optionnel)
NODE_ENV=production
```

### 2. Structure des API

Les endpoints API sont maintenant dans le dossier `api/api/`:

- `POST /api/creer-compte` - Créer un nouveau compte
- `POST /api/verifier-email` - Vérifier l'email
- `POST /api/login` - Connexion
- `POST /api/annuler-compte` - Annuler le compte
- `POST /api/update-resultats` - Mettre à jour les résultats
- `POST /api/demande-premium` - Demander le statut premium
- `POST /api/valider-premium` - Valider le premium (admin)
- `POST /api/freeMins` - Obtenir des minutes gratuites
- `GET /api?exo=xxx` - Récupérer un exercice
- `POST /api/mdp-oublie` - Mot de passe oublié
- `POST /api/mdp-reinitialiser` - Réinitialiser le mot de passe
- `POST /api/admin` - Login admin
- `POST /api/firebase/suggestions` - Envoyer une suggestion
- `POST /api/firebase/authenticate` - Authentification Firebase
- `GET /api/firebase/suggestions-list` - Lister les suggestions

### 3. Déploiement

```bash
# Installer les dépendances
cd api
npm install

# Test local (optionnel)
npm run dev

# Déployer sur Vercel
vercel --prod
```

### 4. Notes importantes

- Les connexions MongoDB sont gérées de manière serverless
- EJS n'est pas recommandé sur Vercel serverless (utiliser des pages statiques)
- Pour les uploads de fichiers, utiliser un service externe (AWS S3, Cloudinary)
- Les sessions sont gérées via JWT

### 5. Sécurité

- Ne jamais commit le fichier `config/firebase-service-account.json`
- Utiliser les variables d'environnement Vercel pour les secrets
