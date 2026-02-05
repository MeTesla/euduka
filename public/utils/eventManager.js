/**
 * Gestionnaire d'événements avec cleanup automatique
 * Évite les fuites mémoire quand les éléments DOM sont supprimés
 */

export class EventManager {
  constructor() {
    this.listeners = []
  }

  /**
   * Attacher un événement et le tracker pour cleanup ultérieur
   * @param {Element} element - Élément cible
   * @param {string} eventType - Type d'événement (click, change, etc.)
   * @param {Function} handler - Callback d'événement
   */
  on(element, eventType, handler) {
    if (!element) {
      console.warn('⚠️ EventManager: element is null')
      return
    }

    element.addEventListener(eventType, handler)
    
    // Tracker pour cleanup
    this.listeners.push({
      element,
      eventType,
      handler
    })
  }

  /**
   * Attacher un événement une seule fois
   * @param {Element} element
   * @param {string} eventType
   * @param {Function} handler
   */
  once(element, eventType, handler) {
    if (!element) {
      console.warn('⚠️ EventManager: element is null')
      return
    }

    const onceHandler = (event) => {
      handler(event)
      this.off(element, eventType, onceHandler)
    }

    this.on(element, eventType, onceHandler)
  }

  /**
   * Attacher le même handler à plusieurs éléments
   * @param {NodeList|Array} elements
   * @param {string} eventType
   * @param {Function} handler
   */
  onMultiple(elements, eventType, handler) {
    if (!elements || elements.length === 0) return

    Array.from(elements).forEach((el) => {
      this.on(el, eventType, handler)
    })
  }

  /**
   * Retirer un événement spécifique
   * @param {Element} element
   * @param {string} eventType
   * @param {Function} handler
   */
  off(element, eventType, handler) {
    if (!element) return

    element.removeEventListener(eventType, handler)
    
    // Retirer du tracking
    this.listeners = this.listeners.filter(
      (listener) =>
        !(
          listener.element === element &&
          listener.eventType === eventType &&
          listener.handler === handler
        )
    )
  }

  /**
   * Retirer TOUS les événements trackés
   * Appeler lors du unmount d'un composant
   */
  cleanup() {
    this.listeners.forEach(({ element, eventType, handler }) => {
      if (element) {
        element.removeEventListener(eventType, handler)
      }
    })
    this.listeners = []
  }

  /**
   * Obtenir le nombre d'événements trackés
   * Utile pour debug
   */
  count() {
    return this.listeners.length
  }
}

/**
 * Créer un gestionnaire d'événements pour un composant
 * @returns {EventManager}
 */
export function createEventManager() {
  return new EventManager()
}
