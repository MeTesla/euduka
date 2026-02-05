//--------- ACTIVITIES 
import { lecteur } from './lecteur.js'
import { resume } from './resume.js'
import { qcm } from './qcm.js'
import { remplirVide } from './remplirVide.js'
import { vf } from './vf.js'
import { ordreEvenements } from './ordreEvenements.js'
import { ordrePhrases } from './ordrePhrases.js'
import { modalLokedContent } from '../misc/modals.js'
import { fetchResultats } from '../misc/utils.js'
import { API_URL } from '../../config/env.js'
import { safeFetch } from '../../utils/api.js'
 
function toast(msg) {
  Toastify({
    text: msg,
    className: "toast-id",
    position: "center",
    close: true
  }).showToast();
}

// Configuration par œuvre
const OEUVRES_CONFIG = {
  bam: {
    readLabel: 'Lire le roman',
    name: 'Bam'
  },
  antigone: {
    readLabel: 'Lire la pièce',
    name: 'Antigone'
  },
  djc: {
    readLabel: 'Lire le roman',
    name: 'Le Dernier Jour d\'un Condamné'
  }
}

const vffData = async (exo) => {
  const result = await safeFetch(API_URL + `?exo=${exo}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('token') || ''
    }
  })

  if (!result.success) {
    console.error('⚠️ Erreur chargement données:', result.error)
    return modalLokedContent()
  }

  const data = result.data
  if (data === "accès interdit") return modalLokedContent()

  return data
}

const wrapper = document.querySelector('.wrapper')

/**
 * Composant générique pour la liste d'exercices
 * @param {HTMLElement} bloc - Conteneur parent
 * @param {string} oeuvre - Code de l'œuvre: 'bam', 'antigone', ou 'djc'
 */
export function listeAct(bloc, oeuvre = 'bam') {
  const config = OEUVRES_CONFIG[oeuvre] || OEUVRES_CONFIG.bam
  let isModified = false

  function handleIsModified(value) {
    return isModified = value
  }

  const html = `<img class="index" src ="/client/assets/img/previous.svg"></svg>
  <div class="list">
    <li class="list-elements lst-lire">${config.readLabel}</li>
    <li class="list-elements lst-resume">Résumé</li>
    <li class="list-elements lst-vf" >Vrai-Faux</li>
    <li class="list-elements lst-qcm">QCM</li>
    <li class="list-elements lst-ordre-ph">Mettre en ordre des phrases</li>
    <li class="list-elements lst-ordre-ev">Mettre en ordre des évènements</li>
    <li class="list-elements lst-vide">Remplir le vide</li>
  </div>`

  const activites = document.createElement('ul')
  activites.innerHTML = html
  activites.classList.add('liste-act')
  bloc.appendChild(activites)

  document.body.style.overflow = 'hidden';

  // Afficher la page d'accueil
  const accueil = document.querySelector('.index')
  const listBlc = document.querySelector('.liste-act')



  accueil.onclick = async () => {
    document.body.style.overflow = "auto"
    await fetchResultats(listBlc, isModified)
  }

  //-------Lire
  const lire = document.querySelector('.lst-lire')
  lire.onclick = async () => {
    const dataKey = `${oeuvre}oeuvre`
    const { oeuvre: oeuvreData } = await vffData(dataKey) || ''
    if (!oeuvreData) return modalLokedContent()
    lecteur(wrapper, oeuvreData)
  }
  //-------Résumé  
  const res = document.querySelector('.lst-resume')
  res.onclick = async () => {
    const dataKey = `${oeuvre}resume`
    const { resumee } = await vffData(dataKey) || ''
    if (!resumee) return modalLokedContent()
    resume(wrapper, resumee)
  }

  const q = document.querySelector('.lst-qcm')
  q.onclick = async () => {
    const dataKey = `${oeuvre}qcm`
    const { qcmData } = await vffData(dataKey) || ''
    if (!qcmData) return modalLokedContent()
    qcm(wrapper, qcmData, handleIsModified)
  }

  const vide = document.querySelector('.lst-vide')
  vide.onclick = async () => {
    const dataKey = `${oeuvre}vide`
    const { textesVide } = await vffData(dataKey) || ''
    if (!textesVide) return modalLokedContent()
    remplirVide(wrapper, textesVide, handleIsModified)
  }

  const vF = document.querySelector('.lst-vf')
  vF.onclick = async () => {
    const dataKey = `${oeuvre}vf`
    const { [`${oeuvre}vf`]: vfData } = await vffData(dataKey) || ''
    if (!vfData) return modalLokedContent()
    vf(wrapper, vfData, handleIsModified)
  }

  const ordreEvents = document.querySelector('.lst-ordre-ev')
  ordreEvents.onclick = async () => {
    const dataKey = `${oeuvre}ordreev`
    const { ordreEventsData } = await vffData(dataKey) || ''
    if (!ordreEventsData) return modalLokedContent()
    ordreEvenements(wrapper, ordreEventsData, handleIsModified)
  }

  const ordrePh = document.querySelector('.lst-ordre-ph')
  ordrePh.onclick = async () => {
    const dataKey = `${oeuvre}ordreph`
    const { phrases } = await vffData(dataKey) || ''
    if (!phrases) return modalLokedContent()
    ordrePhrases(wrapper, phrases, handleIsModified)
  }
}
