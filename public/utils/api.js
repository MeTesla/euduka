/**
 * Gestionnaire d'état du loader pour les appels API
 */
const loaderState = {
  count: 0,
  
  getLoader() {
    return document.querySelector('.loader')
  },
  
  show() {
    this.count++
    const loader = this.getLoader()
    if (loader) {
      loader.classList.remove('hidden')
    }
  },
  
  hide() {
    this.count = Math.max(0, this.count - 1)
    if (this.count === 0) {
      const loader = this.getLoader()
      if (loader) {
        loader.classList.add('hidden')
      }
    }
  }
}

/**
 * Wrapper sécurisé pour fetch requests
 * Gère les erreurs HTTP, réseau, et validation de réponse
 */

/**
 * Effectuer un fetch sécurisé avec gestion d'erreurs complète
 * @param {string} url - URL de la requête
 * @param {Object} options - Options fetch (method, headers, body, etc.)
 * @returns {Promise<{success: boolean, data: any, error?: string}>}
 * 
 * @example
 * const result = await safeFetch('/login', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ email, password })
 * })
 * 
 * if (result.success) {
 *   console.log('Login successful:', result.data)
 * } else {
 *   console.error('Login failed:', result.error)
 * }
 */
export async function safeFetch(url, options = {}) {
  try {
    // 1️⃣ Effectuer le fetch
    const response = await fetch(url, options)

    // 2️⃣ Valider le statut HTTP AVANT parsing JSON
    if (!response.ok) {
      const errorData = await parseResponseSafely(response)
      
      if (response.status === 401) {
        return {
          success: false,
          error: 'Non authentifié. Veuillez vous connecter.',
          status: 401,
          data: errorData
        }
      } else if (response.status === 403) {
        return {
          success: false,
          error: 'Accès refusé.',
          status: 403,
          data: errorData
        }
      } else if (response.status === 404) {
        return {
          success: false,
          error: 'Ressource non trouvée.',
          status: 404,
          data: errorData
        }
      } else if (response.status >= 500) {
        return {
          success: false,
          error: 'Erreur serveur. Veuillez réessayer plus tard.',
          status: response.status,
          data: errorData
        }
      } else {
        return {
          success: false,
          error: `Erreur HTTP ${response.status}`,
          status: response.status,
          data: errorData
        }
      }
    }

    // 3️⃣ Parser la réponse JSON de manière sûre
    const data = await parseResponseSafely(response)
    
    return {
      success: true,
      data: data,
      status: response.status
    }

  } catch (error) {
    // 4️⃣ Gérer les erreurs réseau/parsing
    console.error('⚠️ safeFetch error:', error)

    if (error instanceof TypeError) {
      // Erreur réseau (connection refused, network timeout, etc.)
      return {
        success: false,
        error: 'Erreur réseau. Vérifiez votre connexion Internet.',
        networkError: true
      }
    } else if (error instanceof SyntaxError) {
      // JSON parsing failed
      return {
        success: false,
        error: 'Réponse serveur invalide.',
        parseError: true
      }
    } else {
      return {
        success: false,
        error: error.message || 'Erreur inconnue'
      }
    }
  }
}

/**
 * Parser une réponse JSON de manière sûre
 * @private
 * @param {Response} response - Objet Response
 * @returns {Promise<any>} Données parsées ou objet vide
 */
async function parseResponseSafely(response) {
  try {
    const contentType = response.headers.get('content-type')
    
    // Vérifier si la réponse est du JSON
    if (contentType?.includes('application/json')) {
      return await response.json()
    } else {
      // Sinon retourner le texte
      const text = await response.text()
      return { body: text }
    }
  } catch (error) {
    console.error('⚠️ Parse response error:', error)
    return {}
  }
}

/**
 * Effectuer un fetch POST avec format standard
 * @param {string} url 
 * @param {Object} body - Données à envoyer
 * @param {string} token - Token d'authentification (optionnel)
 * @returns {Promise<{success: boolean, data: any, error?: string}>}
 */
export async function safeFetchPost(url, body, token = null) {
  const headers = {
    'Content-Type': 'application/json'
  }
  
  if (token) {
    headers['Authorization'] = token
  }

  return safeFetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
}

/**
 * Effectuer un fetch GET avec authentification optionnelle
 * @param {string} url 
 * @param {string} token - Token d'authentification (optionnel)
 * @returns {Promise<{success: boolean, data: any, error?: string}>}
 */
export async function safeFetchGet(url, token = null) {
  const headers = {}
  
  if (token) {
    headers['Authorization'] = token
  }

  return safeFetch(url, {
    method: 'GET',
    headers: headers
  })
}

/**
 * Effectuer un fetch avec affichage automatique du loader
 * @param {string} url - URL de la requête
 * @param {Object} options - Options fetch
 * @returns {Promise<{success: boolean, data: any, error?: string}>}
 */
export async function safeFetchWithLoader(url, options = {}) {
  loaderState.show()
  try {
    return await safeFetch(url, options)
  } finally {
    loaderState.hide()
  }
}

/**
 * Effectuer un fetch POST avec loader
 * @param {string} url 
 * @param {Object} body - Données à envoyer
 * @param {string} token - Token d'authentification (optionnel)
 * @returns {Promise<{success: boolean, data: any, error?: string}>}
 */
export async function safeFetchPostWithLoader(url, body, token = null) {
  const headers = {
    'Content-Type': 'application/json'
  }
  
  if (token) {
    headers['Authorization'] = token
  }

  return safeFetchWithLoader(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
}

/**
 * Effectuer un fetch GET avec loader
 * @param {string} url 
 * @param {string} token - Token d'authentification (optionnel)
 * @returns {Promise<{success: boolean, data: any, error?: string}>}
 */
export async function safeFetchGetWithLoader(url, token = null) {
  const headers = {}
  
  if (token) {
    headers['Authorization'] = token
  }

  return safeFetchWithLoader(url, {
    method: 'GET',
    headers: headers
  })
}

/**
 * Effectuer un fetch avec FormData (pour upload de fichiers) avec loader
 * @param {string} url 
 * @param {FormData} formData 
 * @param {string} token - Token d'authentification (optionnel)
 * @returns {Promise<{success: boolean, data: any, error?: string}>}
 */
export async function safeFetchFormDataWithLoader(url, formData, token = null) {
  loaderState.show()
  try {
    const headers = {}
    if (token) {
      headers['Authorization'] = token
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData
    })

    if (!response.ok) {
      const errorData = await parseResponseSafely(response)
      return {
        success: false,
        error: `Erreur HTTP ${response.status}`,
        status: response.status,
        data: errorData
      }
    }

    const data = await parseResponseSafely(response)
    return {
      success: true,
      data: data,
      status: response.status
    }
  } catch (error) {
    console.error('⚠️ safeFetchFormDataWithLoader error:', error)
    if (error instanceof TypeError) {
      return {
        success: false,
        error: 'Erreur réseau. Vérifiez votre connexion Internet.',
        networkError: true
      }
    } else {
      return {
        success: false,
        error: error.message || 'Erreur inconnue'
      }
    }
  } finally {
    loaderState.hide()
  }
}
