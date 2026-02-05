/**
 * Constantes métier du projet
 */

// États utilisateur
export const USER_ROLES = {
  NON_VERIFIE: 'non_verifie',       // État 1: Compte créé, email non vérifié
  BASIC: 'basic',                    // État 2: Email vérifié, compte de base
  ATTENTE_PREMIUM: 'attente_premium', // État 3: Demande premium en cours
  PREMIUM: 'premium'                 // État 4: Compte premium validé
}

// Configuration des exercices
export const EXERCISE_CONFIG = {
  qcm: {
    questionCount: 4,
    type: 'qcm',
    name: 'QCM'
  },
  vf: {
    questionCount: 4,
    type: 'vf',
    name: 'Vrai/Faux'
  },
  remplir: {
    questionCount: 2,
    type: 'remplir',
    name: 'Remplir les vides'
  },
  ordrePhrases: {
    questionCount: 2,
    type: 'ordrePhrases',
    name: 'Ordre des phrases'
  },
  ordreEvenements: {
    questionCount: 2,
    type: 'ordreEvenements',
    name: 'Ordre des événements'
  }
}

// Oeuvres littéraires
export const WORKS = {
  ANTIGONE: 'antigone',
  BAM: 'bam',
  DJC: 'djc'
}

// Constantes d'affichage
export const UI_CONFIG = {
  LAST_SCORES_TO_DISPLAY: 6,
  FREE_TRIAL_MINUTES: 2,
  TOAST_DURATION_MS: 3000
}

// Clés localStorage
export const STORAGE_KEYS = {
  PROFILE: 'profile',
  ROLE: 'role',
  TOKEN: 'token',
  LISTE: 'liste',
  RESULTS: 'resultats'
}
