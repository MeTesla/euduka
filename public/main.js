const l = console.log

import { API_URL } from './config/env.js'
import { listeAct } from './components/act/listeAct.js'
import { conic } from './utils.js'
import { qcmFigures } from './langue/figures/figures.js'
import { userSuggests } from './auth/login.js'
import { generateMenu } from './components/misc/utils.js'

import { creerCompte, toast } from './components/misc/utils.js'
import { adminLogin } from './components/misc/login.js'

//------------------Loader -------------------
const loader = document.querySelector('.loader')
window.addEventListener("load", function () {
  loader.classList.add('hidden');
  document.querySelector('.wrapper').style.display = "block"

})

//-----------------Socket.io------------------------
const socket = io(API_URL)
socket.on('liste', (liste) => {
  localStorage.setItem('liste', JSON.stringify(liste))
})

// -------------------Menu-------------------------------
const menu = document.querySelector('.nav .menu')
generateMenu(localStorage.getItem('role'), menu, menu)


//---------Hero créer compte----------------
const btnHero = document.querySelector('.btn-compte')
  if (localStorage.getItem('role') === 'non_verifie') {
  btnHero.style.display = "none"
}
btnHero.addEventListener('click', () => creerCompte())

//-------------- Clique sur les oeuvres
const antigone = document.querySelector('.oeuvres-container .antigone')
const djc = document.querySelector('.oeuvres-container .djc')
const bam = document.querySelector('.oeuvres-container .bam')
const figure = document.querySelector('.figure')

bam.onclick = () => { listeAct(document.body, 'bam') }
antigone.onclick = () => { listeAct(document.body, 'antigone') }
djc.onclick = () => { listeAct(document.body, 'djc') }
figure.onclick = () => { qcmFigures(document.body) }

// ----------------- Date examen --------------------
const mois = document.querySelector('.mois .chiffre')
const jours = document.querySelector('.jours .chiffre')
const heures = document.querySelector('.heures .chiffre')

const dateObjectif = "2026-05-26";
const tempsRestant = calculerTempsRestant(dateObjectif);

mois.innerHTML = tempsRestant.mois
jours.innerHTML = tempsRestant.jours
heures.innerHTML = tempsRestant.heures + 8

function calculerTempsRestant(dateDonnee) {
  // Convertir la date donnée en objet Date
  const dateObjectif = new Date(dateDonnee);

  // Obtenir la date actuelle
  const dateActuelle = new Date();

  // Calculer la différence de temps en millisecondes
  const differenceMillis = dateObjectif.getTime() - dateActuelle.getTime();

  // Calculer les mois, jours et heures
  const mois = Math.floor(differenceMillis / (1000 * 60 * 60 * 24 * 30));
  const jours = Math.floor((differenceMillis % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const heures = Math.floor((differenceMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Formatter le résultat
  return { mois: mois, jours: jours, heures: heures }//`${mois} : ${jours} : ${heures}`;
}

// Langue 
const langue = document.querySelectorAll('.langue')[1]
langue.addEventListener('click', () => {
  // const reponse = await fetch('http://localhost:3000/admin/euduka/admin')
  // const data = await reponse.text()
  // const div = document.createElement('DIV')
  // div.className = "div-ejs"
  // div.innerHTML = data
  // document.body.appendChild(div)
  adminLogin()
})

//---------- Suggestion FIREBASE -----------
const nom = document.getElementById('nom')
const suggest = document.getElementById('suggest')
const envoyer = document.getElementById('btn-envoyer')
envoyer.addEventListener('click', () => {
  if (!nom.value) {
    nom.style.border = "2px solid red"
    setTimeout(() => { nom.style.border = "" }, 1500);
    return
  }
  if (!suggest.value) {
    suggest.style.border = "2px solid red"
    setTimeout(() => { suggest.style.border = "" }, 1500);
    return
  }
  userSuggests(nom, suggest)
})

