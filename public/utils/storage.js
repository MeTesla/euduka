/**
 * Wrapper localStorage sécurisé
 * Évite les crashes sur JSON.parse() quand clés sont manquantes ou corrompues
 */

import { STORAGE_KEYS } from '../config/constants.js'

/**
 * Parse JSON de localStorage en toute sécurité
 * @param {string} key - Clé localStorage
 * @param {any} defaultValue - Valeur par défaut si clé manquante/invalide
 * @returns {any} Objet parsé ou valeur par défaut
 */
export function safeJSON(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key)
    if (value === null) {
      return defaultValue
    }
    return JSON.parse(value)
  } catch (error) {
    console.error(`⚠️ localStorage parse error for key "${key}":`, error)
    return defaultValue
  }
}

/**
 * Récupérer le profil utilisateur
 * @returns {Object|null} Profil ou null
 */
export function getProfile() {
  return safeJSON(STORAGE_KEYS.PROFILE, null)
}

/**
 * Sauvegarder le profil utilisateur
 * @param {Object} profile - Données profil
 */
export function setProfile(profile) {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile))
}

/**
 * Récupérer le rôle utilisateur
 * @returns {string|null} Role (non_verifie, basic, attente_premium, premium) ou null
 */
export function getRole() {
  return localStorage.getItem(STORAGE_KEYS.ROLE)
}

/**
 * Sauvegarder le rôle utilisateur
 * @param {string} role - État utilisateur
 */
export function setRole(role) {
  localStorage.setItem(STORAGE_KEYS.ROLE, role)
}

/**
 * Récupérer le token JWT
 * @returns {string|null} Token ou null
 */
export function getToken() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN)
}

/**
 * Sauvegarder le token JWT
 * @param {string} token - JWT token
 */
export function setToken(token) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token)
}

/**
 * Récupérer la liste des exercices (reçue via Socket.IO)
 * @returns {Array|null} Liste d'exercices ou null
 */
export function getListe() {
  return safeJSON(STORAGE_KEYS.LISTE, null)
}

/**
 * Sauvegarder la liste des exercices
 * @param {Array} liste - Exercices disponibles
 */
export function setListe(liste) {
  localStorage.setItem(STORAGE_KEYS.LISTE, JSON.stringify(liste))
}

/**
 * Récupérer les résultats utilisateur
 * @returns {Object|null} Résultats (qcm, vf, remplir, etc.) ou null
 */
export function getResults() {
  const profile = getProfile()
  return profile?.resultats || null
}

/**
 * Mettre à jour les résultats de manière imbriquée
 * @param {Object} newResults - Nouveaux résultats à merger
 */
export function updateResults(newResults) {
  const profile = getProfile()
  if (profile) {
    profile.resultats = {
      ...profile.resultats,
      ...newResults
    }
    setProfile(profile)
  }
}

/**
 * Effacer toutes les données utilisateur (logout)
 */
export function clearUserData() {
  localStorage.removeItem(STORAGE_KEYS.PROFILE)
  localStorage.removeItem(STORAGE_KEYS.ROLE)
  localStorage.removeItem(STORAGE_KEYS.TOKEN)
}

/**
 * Effacer TOUT (debug/admin)
 */
export function clearAll() {
  localStorage.clear()
}
