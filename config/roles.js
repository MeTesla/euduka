/**
 * Constantes des rôles utilisateur dans l'application
 * Ces valeurs doivent être utilisées partout dans le backend
 */
const ROLES = {
    NON_VERIFIE: 'non_verifie',       // État 1: Compte créé, email non vérifié
    BASIC: 'basic',                    // État 2: Email vérifié, compte de base
    ATTENTE_PREMIUM: 'attente_premium', // État 3: Demande premium en cours
    PREMIUM: 'premium'                 // État 4: Compte premium validé
}

module.exports = ROLES
