const l = console.log;

// ⚠️ DEPRECATED: Firebase client-side code has been moved to backend
// All Firebase operations now go through Express routes in server/routes/firebaseRoutes.js

import { safeFetchPostWithLoader } from '../utils/api.js'
import { API_URL } from '../config/env.js'

/**
 * Authenticate user via backend
 * @deprecated Uses backend route instead of direct Firebase
 */
export async function authenticateUser() {
  try {
    const result = await safeFetchPostWithLoader(`${API_URL}/api/firebase/authenticate`, {
      username: 'Hakim'
    })

    if (result.success) {
      document.body.style.opacity = '1';
      console.log('✅ Connected:', result.data.message);
      return true;
    } else {
      console.error('❌ Authentication failed:', result.error);
      location.assign('https://www.google.com');
      return false;
    }
  } catch (error) {
    console.error('❌ Authentication error:', error);
    location.assign('./figures.html');
    return false;
  }
}

/**
 * Submit user suggestions via backend
 * @deprecated Uses backend route instead of direct Firebase
 */
export async function userSuggests(nom, suggest) {
  try {
    if (!nom.value || !suggest.value) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const result = await safeFetchPostWithLoader(`${API_URL}/api/firebase/suggestions`, {
      nom: nom.value,
      suggestion: suggest.value
    })

    if (result.success) {
      alert('✅ Merci, votre suggestion a été bien envoyée');
      viderchamps();
    } else {
      alert('❌ Erreur: ' + (result.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('❌ Suggestion error:', error);
    alert('❌ Erreur lors de l\'envoi: ' + error.message);
  }
}

/**
 * Clear form fields
 */
const viderchamps = () => {
  const nom = document.getElementById('nom');
  const suggest = document.getElementById('suggest');
  if (nom) nom.value = '';
  if (suggest) suggest.value = '';
};


