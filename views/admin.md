## Création d'une Page de Connexion avec Vérification

Pour envoyer un template HTML de page de connexion contenant des champs pour l'email et le mot de passe, suivi de l'affichage des données des élèves après vérification, vous pouvez suivre ces étapes.

### 1. Configuration du Serveur

Ajoutez un formulaire de connexion et une logique de vérification au serveur Express.

#### Serveur Express

Voici un exemple complet avec la page de connexion :

```javascript
// Importation des modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware pour traiter les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const eleves = [
    { nom: 'Dupont', prenom: 'Jean', age: 20 },
    { nom: 'Martin', prenom: 'Sophie', age: 22 },
    { nom: 'Tremblay', prenom: 'Julien', age: 19 },
];

// Page de connexion
app.get('/adminLogin', (req, res) => {
    res.render('adminLogin');
});

// Traitement de la connexion
app.post('/adminLogin', (req, res) => {
    const { email, motdepasse } = req.body;

    // Exemple de vérification (cela pourrait provenir d'une base de données)
    if (email === 'admin@example.com' && motdepasse === 'password') {
        // Redirection vers la page admin
        res.redirect('/admin');
    } else {
        res.send('Identifiants incorrects');
    }
});

// Route pour l'admin
app.get('/admin', (req, res) => {
    res.render('admin', { eleves: eleves });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur écoute sur http://localhost:${port}`);
});
```

### 2. Création du Template de Connexion

Créez un fichier nommé `adminLogin.ejs` dans le dossier `views` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Page de Connexion</title>
</head>
<body>
    <h1>Connexion Administrateur</h1>
    <form action="/login" method="POST">
        <label for="email">Email:</label>
        <input type="email" name="email" required>
        <br>
        <label for="motdepasse">Mot de Passe:</label>
        <input type="password" name="motdepasse" required>
        <br>
        <button type="submit">Se Connecter</button>
    </form>
</body>
</html>
```

### 3. Création du Template des Élèves

Le fichier `admin.ejs` que vous avez créé précédemment reste inchangé :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Admin - Gestion des Élèves</title>
</head>
<body>
    <h1>Tableau des Élèves</h1>
    <table border="1">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
            <% eleves.forEach(elève => { %>
                <tr>
                    <td><%= elève.nom %></td>
                    <td><%= elève.prenom %></td>
                    <td><%= elève.age %></td>
                </tr>
            <% }); %>
        </tbody>
    </table>
</body>
</html>
```

### Explications

- **Page de Connexion (`login.ejs`)** : Cette page inclut un formulaire avec des champs pour l’email et le mot de passe. Lors de la soumission du formulaire, une requête POST est envoyée à `/login`.
- **Vérification des Identifiants** : Dans la route pour POST `/login`, nous vérifions les informations d'identification. Si les identifiants sont corrects, l'utilisateur est redirigé vers la page `/admin`. Sinon, un message d'erreur est affiché.
- **Route `/admin`** : Cette route afficherait les données des élèves après une connexion réussie.

### Conclusion

Avec cette configuration, vous avez mis en place une page de connexion fonctionnelle qui, après vérification des identifiants, redirige l'utilisateur vers la page des élèves. Assurez-vous de protéger vos identifiants et d'utiliser une gestion des sessions pour des applications réelles !