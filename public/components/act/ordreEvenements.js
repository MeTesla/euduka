
//import {accueil} from '../../scripts/main.js'
//import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import { closeAct, homeAct } from '../misc/closeAct.js'
import { entete } from '../misc/entete.js';
/*
App's logic
1- créer un nombre de div équivalent au nombre de phrases
    dans le tableau des phrase 3 4 5 max
2-leur attribué les phrases , class, id
3 calculer height of Drag et attribuer cette valeur à Drop

! - penser a l'animation des phrases au déplacement.
! problème getboudingclientrect().top n'a pas donné le resultat attendu
    j'ai dû utiliser flex avec une marge
! probleme (for of) : j'ai utilisé FOR
! problem comparaison of two arrays / résolut: convert arrays toString() and compare them
! j'ai réussi mon algo de randomiser
*/
const l = console.log

export function ordreEvenements(bloc, data) {
  const div = document.createElement('div');
  div.classList.add('ordre-events');
  div.innerHTML = code();
  bloc.appendChild(div);

  // Home & Close buttons 
  const home = document.querySelector('.home')
  home.onclick = () => { homeAct(div) }
  const close = document.querySelector('.close')
  close.onclick = () => { closeAct(div); }

  const container = document.querySelector('.container');
  let drag = document.querySelector('.drag')
  let drop = document.querySelector('.drop')
  let verifier = document.querySelector('.valider')
  let resultat = document.querySelector('.resultat')
  let message = document.querySelector('.message')
  let bnRep = document.querySelector('.bn-rep')
  let voirRep = document.querySelector('.voir-rep')
  let suivant = document.querySelector('.ph-suivante')
  //let refaire = document.querySelector('.refaire')
  let index = 0, nbrEvents = 5, initOneChapEvents = [], oneChapEvents = []
  let phrasesIndexes = [], sortedPhrasesIndexes = [], dropedPhrases = []

  loadQuestion()
  function loadQuestion() {
    const sortedData = [...data]
    sortedData.sort(function (a, b) { return 0.5 - Math.random() })
    for (let i = 0; i < 3; i++) {
      oneChapEvents.push(sortedData[i])
      phrasesIndexes.push(data.indexOf(sortedData[i]))
    }

    sortedPhrasesIndexes = [...phrasesIndexes]
    sortedPhrasesIndexes.sort(function (a, b) { return a - b })

    initOneChapEvents = [...oneChapEvents] // Pour la correction

    //oneChapEvents.sort(function(a,b){return 0.5 - Math.random()})  
    // créer des div au nombre de phrases
    for (let i = 0; i < oneChapEvents.length; i++) {
      const div = document.createElement('div')
      div.setAttribute('class', 'phrase')
      div.dataset.order = phrasesIndexes[i]
      div.innerHTML = oneChapEvents[i]
      drag.appendChild(div)

      div.addEventListener('click', (ev) => {
        if (div.parentElement == drag) {
          div.classList.add("li")
          drop.append(div)
        } else {
          div.classList.remove('li')
          drag.appendChild(div)
        }
      })
    }
    drop.style.height = drag.getBoundingClientRect().height + 'px'

  }


  // boutton verifier
  verifier.addEventListener('click', () => {
    if (!drop.hasChildNodes()) return
    resultat.style.bottom = "0"

    //praparer le tableau des réponses

    for (let i = 0; i < drop.childNodes.length; i++) {
      dropedPhrases.push(drop.childNodes[i].dataset.order)
    }


    if (dropedPhrases.toString() == sortedPhrasesIndexes.toString()) {
      l(dropedPhrases.toString(), sortedPhrasesIndexes.toString())
      message.innerText = "C'est correct"
      voirRep.style.display = "none"
    } else {
      voirRep.style.display = "block"
      message.innerText = "C'est incorrect !"
      bnRep.style.display = "none"

      // AFFICHER LA BONNE REPONSE
      sortedPhrasesIndexes.forEach((el, i) => {
        const div = document.createElement('div')
        div.classList = 'phrase'
        div.innerText = data[sortedPhrasesIndexes[i]]
        bnRep.appendChild(div)
      })
    }

  })

  voirRep.onclick = () => {
    bnRep.style.display = "block"
    voirRep.style.display = "none"
    message.innerHTML = "" // .display="non"
  }
  //boutton suviant
  suivant.addEventListener('click', () => {
    if (index < nbrEvents) {
      index += 1
      reinitialiser()
    } else {
      resultat.style.bottom = "0"
      resultat.innerHTML = `<h1 style="color: var(--comp)">FIN de session</h1>`
    }
    // Le prob prevenait de l'integration du click sur suivant dans la fonction click verifier
    // Peut être c'est l'effet buble


  })
  //Refaire
  /*refaire.addEventListener('click', () => {
    //reinitialiser()
  })
  */

  function reinitialiser(re) {
    bnRep.innerHTML = ""
    drag.innerHTML = ""
    drop.innerHTML = ""
    initOneChapEvents = []
    oneChapEvents = []
    phrasesIndexes = []
    sortedPhrasesIndexes = []
    dropedPhrases = []
    resultat.style.bottom = "-100vh" //display="none"//resultat.remove()
    loadQuestion()
  }

  function code() {
    const html = `${entete()}
    <div class="consigne">
      Je mets en ordre les évènements du chapitre.
    </div>
    
    <div class="drag-drop">
         <div class="drop"></div>
         <div class="drag"></div>
    </div>
    
    <div class="valider">Vérifier </div>
    
    <div class="resultat">
      <div class="res-cont"> 
        <div class="message"></div>
        <div class="bn-rep"> </div>
        <div class="ph-options">  
          <div class="ph-suivante"> Suivant </div>
          <div class="voir-rep"> Voir la réponse </div>
        </div>  
      </div>
    </div>
    
    `
    return html
  }

}