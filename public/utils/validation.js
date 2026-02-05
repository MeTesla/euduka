/**
 * Validation d'inputs utilisateur côté client
 * À combiner avec validation serveur pour sécurité complète
 */

/**
 * Valider format email
 * @param {string} email
 * @returns {{valid: boolean, error?: string}}
 */
export function validateEmail(email) {
  if (!email || email.trim() === '') {
    return { valid: false, error: 'Email requis' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Email invalide' }
  }

  if (email.length > 254) {
    return { valid: false, error: 'Email trop long (max 254 caractères)' }
  }

  return { valid: true }
}

/**
 * Valider nom/prénom
 * @param {string} name
 * @param {string} fieldName - "Nom" ou "Prénom" pour message d'erreur
 * @returns {{valid: boolean, error?: string}}
 */
export function validateName(name, fieldName = 'Nom') {
  if (!name || name.trim() === '') {
    return { valid: false, error: `${fieldName} requis` }
  }

  if (name.length < 2) {
    return { valid: false, error: `${fieldName} doit contenir au moins 2 caractères` }
  }

  if (name.length > 50) {
    return { valid: false, error: `${fieldName} ne doit pas dépasser 50 caractères` }
  }

  // Autoriser uniquement lettres, espaces, tirets, apostrophes
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/
  if (!nameRegex.test(name)) {
    return { valid: false, error: `${fieldName} contient des caractères invalides` }
  }

  return { valid: true }
}

/**
 * Valider numéro téléphone
 * @param {string} phone
 * @returns {{valid: boolean, error?: string}}
 */
export function validatePhone(phone) {
  if (!phone || phone.trim() === '') {
    return { valid: false, error: 'Téléphone requis' }
  }

  // Supprimer espaces, tirets, points
  const cleanPhone = phone.replace(/[\s\-\.]/g, '')

  // Vérifier format (10-15 chiffres)
  if (!/^\d{10,15}$/.test(cleanPhone)) {
    return { valid: false, error: 'Téléphone invalide (10-15 chiffres)' }
  }

  return { valid: true }
}

/**
 * Valider mot de passe
 * @param {string} password
 * @returns {{valid: boolean, error?: string}}
 */
export function validatePassword(password) {
  if (!password || password.trim() === '') {
    return { valid: false, error: 'Mot de passe requis' }
  }

  if (password.length < 4) {
    return { valid: false, error: 'Mot de passe doit contenir au moins 4 caractères' }
  }

  if (password.length > 128) {
    return { valid: false, error: 'Mot de passe trop long' }
  }

  return { valid: true }
}

/**
 * Valider formulaire création de compte
 * @param {Object} formData - {nom, prenom, email, tel}
 * @returns {{valid: boolean, errors: Object}}
 */
export function validateSignupForm(formData) {
  const errors = {}

  // Valider nom
  const nomResult = validateName(formData.nom, 'Nom')
  if (!nomResult.valid) errors.nom = nomResult.error

  // Valider prénom
  const prenomResult = validateName(formData.prenom, 'Prénom')
  if (!prenomResult.valid) errors.prenom = prenomResult.error

  // Valider email
  const emailResult = validateEmail(formData.email)
  if (!emailResult.valid) errors.email = emailResult.error

  // Valider téléphone
  const phoneResult = validatePhone(formData.tel)
  if (!phoneResult.valid) errors.tel = phoneResult.error

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Valider formulaire login
 * @param {Object} formData - {email, password}
 * @returns {{valid: boolean, errors: Object}}
 */
export function validateLoginForm(formData) {
  const errors = {}

  // Valider email
  const emailResult = validateEmail(formData.email)
  if (!emailResult.valid) errors.email = emailResult.error

  // Valider mot de passe
  const passwordResult = validatePassword(formData.password)
  if (!passwordResult.valid) errors.password = passwordResult.error

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Échapper HTML pour prévenir XSS
 * @param {string} text
 * @returns {string}
 */
export function escapeHTML(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Valider et nettoyer input
 * @param {string} input
 * @param {number} maxLength
 * @returns {string} Input nettoyé
 */
export function sanitizeInput(input, maxLength = 255) {
  if (!input) return ''
  
  // Trim
  let clean = input.trim()
  
  // Limiter longueur
  if (clean.length > maxLength) {
    clean = clean.substring(0, maxLength)
  }
  
  // Échapper caractères spéciaux HTML
  clean = escapeHTML(clean)
  
  return clean
}
