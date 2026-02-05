// Modifications: 10 fév
// limiter une session de question en 10
// modifier la logique de chargement de 10 qst
// Afficher un écran de fin de session : refaire l'exercices / quitter / autre session
// Red Green feedback
/*
shuffle data
variable globale INDEX
charger 10 questions dans un nouveau tableau
load question
qst 10 => aficher modal: résultat
*/
const l = console.log
import { closeAct, homeAct } from '../misc/closeAct.js'
import { entete } from '../misc/entete.js';
import { modalFinSession } from '../../utils.js'
import { handleResultats, sliceScores, toast } from '../misc/utils.js';
import { getProfile } from '../../utils/storage.js';

export function vf(bloc, data, callBack) {


  const div = document.createElement('div')
  div.setAttribute('class', 'vrai-faux')
  div.innerHTML = codeHTML();
  bloc.appendChild(div);

  // --- ROUTE


  // Home & Close buttons 
  const home = document.querySelector('.home')
  home.onclick = () => { homeAct(div) }
  const close = document.querySelector('.close')
  close.onclick = () => { closeAct(div); }

  //DOM variables
  const question = document.querySelector('.question')
  const vraiBtn = document.querySelector('.vrai')
  const fauxBtn = document.querySelector('.faux')
  const valider = document.querySelector('.valider')
  const suivant = document.querySelector('.suivant')
  const precedent = document.querySelector('.precedent')
  const score = document.querySelector('.score')
  const numQst = document.querySelector('.num-qst')
  const rep = document.querySelectorAll('.rep')
  const progress = document.querySelector('.vrai-faux .progress')



  let index = 0, nbrQst = 4, nbrSession = 1
  let currentQst = 0, monScore = 0, choosenRep = false,
    repondu = [], answered, questions = [], translationCounter = []

  // repenser cette logique : alea tout le tableau, puis choix 10 qst. 
  //en cas de session suiv. passer le pointeur à 10 ...
  //en cas de refaire: repasser pointeur à 0

  //Shuffle les 15 questions
  data.sort(function (a, b) { return 0.5 - Math.random() })

  //charger n questions dans un tableau
  for (let i = index; i < index + nbrQst; i++) {
    questions.push(data[i])
  }
  // LOAD QUESTIONS on DOM
  loadQst()

  function loadQst() {
    selection()
    answered = false
    choosenRep = ""
    // Changer 300 par une valeur dynamique pour le responsif
    progress.style.width = (300 / questions.length) * (currentQst + 1) + 'px'
    question.innerHTML = ` <div class="francais"> ${questions[currentQst].question}</div>
      <div class="arabe"> ${questions[currentQst].question_ar}</div>
      <div class="ar"><img src="./assets/img/ar-translate.png" /></div>`

    const arBtn = document.querySelector('.ar')
    const arabe = document.querySelector('.arabe')

    function translationCount(arr) {
      if (!arr.includes(currentQst)) {
        arr.push(currentQst)
      } else {
        const ind = arr.indexOf(currentQst)
        if (ind !== -1) return //arr.splice(ind, 1)
      }
      console.log(arr);

    }

    arBtn.addEventListener('click', () => {
      if (translationCounter.length === 2) return toast('Plus droit à la traduction')
      translationCount(translationCounter)
      /*  
        

          countTranslation.contains(numQst)?
          countTranslation.push(numQst):
          countTranlation.shift(numQst)


let tableau = [1, 2, 3, 4, 5];
const valeurASupprimer = 3;

const index = tableau.indexOf(valeurASupprimer);
if (index !== -1) {
    tableau.splice(index, 1);
}
      */
      arabe.style.display === 'block' ?
        (arabe.style.display = 'none') :
        (arabe.style.display = 'block')
    })


    // TEST des réponses faites
    if (repondu.includes(currentQst + 1)) {
      valider.style.opacity = "0.6"
      valider.removeEventListener('click', valid)
    } else {
      valider.style.opacity = "1"
      valider.addEventListener('click', valid)
    }
  }

  //Selection VRAI - FAUX
  rep.forEach((item) => {
    item.addEventListener('click', () => {
      if (answered == true) return
      choosenRep = item
      selection()
      item.classList.add('selected')
      // audio.src='../assets/audios/click.mp3'
      // audio.play()
    })
  })

  valider.addEventListener('click', valid)

  function valid() {
    let audioFeed = new Audio()
    if (choosenRep) {
      answered = true
      repondu.push(currentQst + 1)
      valider.style.opacity = "0.6"
      valider.removeEventListener('click', valid)
      selection()
      if (choosenRep.innerText === questions[currentQst].rep) {
        monScore += 10
        score.innerText = monScore
        // audio.src='../assets/audios/yay.mp3'
        // audio.play()
        choosenRep.classList.add('reponseCorrect')
      } else {
        choosenRep.classList.add('reponseIncorrect')
        /* Array.from(rep).filter((item) => {
           return item.innerText == questions[currentQst].rep.trim()
         [0].classList.add('reponseCorrect')
        })
        */
        // audio.src='../assets/audios/wrong.mp3'
        // audio.play()

      }

      // Feed réponse correcte
      //let choix=Array.from(document.querySelectorAll('.rep'))
      /*const reponseCorrect = choix.filter((item) => {
        return item.innerText == questions[currentQst].rep.trim()
      })
      reponseCorrect[0].classList.add('reponseCorrect')
      */
    }
    let resultat = {
      score: monScore / 10,
      nbrQst: nbrQst,
      end: nbrSession
    }
    if (repondu.length == nbrQst) {
      const profileScores = getProfile()?.resultats?.vf?.scores || []
      let resultatVF = {
        vf: {
          score: monScore / 10,
          scores: [...sliceScores(profileScores), monScore / 10],
          nbrQsts: nbrQst,
          date: new Date().toLocaleDateString('fr-FR'),
          lastSession: questions
        }
      }
      handleResultats(resultatVF)
      callBack(true)
      modalFinSession(div, reinitialiser, resultat)
    }
  }

  suivant.addEventListener('click', () => {
    if (currentQst < questions.length - 1) {
      currentQst++
      loadQst()
    } else {
      suivant.querySelector('span').style.display = "block"
      setTimeout(() => {
        suivant.querySelector('span').style.display = "none"
      }, 700);
    }
  })

  precedent.addEventListener('click', () => {
    if (currentQst > 0) {
      currentQst--
      loadQst()
    } else {
      precedent.querySelector('span').style.display = "block"
      setTimeout(() => {
        precedent.querySelector('span').style.display = "none"
      }, 700);
    }
  })

  // Réinitialisation
  function reinitialiser(re) {
    monScore = 0; repondu = []; currentQst = 0; translationCounter = []
    progress.style.width = (300 / questions.length) * (currentQst + 1) + 'px'
    score.innerText = "00"
    if (re) {
      index += nbrQst;
      nbrSession += 1
    }
    questions = []
    for (let i = index; i < index + nbrQst; i++) questions.push(data[i])
    loadQst()
  }

  function selection() {
    for (let x = 0; x < 2; x++) {
      rep[x].classList.remove('selected')
      rep[x].classList.remove('reponseCorrect')
      rep[x].classList.remove('reponseIncorrect')

    }
  }

  function codeHTML() {
    const html = `${entete()}
    <div class="progress-bar">
      <div class="progress"></div>
    </div>

    <div class="vf-qst-container">
      
      <div class="question">
       
      </div>
        <div class="choix">
          <div class="vrai rep">Vrai</div>
          <div class="faux rep">Faux</div>
        </div>
      </div>    
    </div>

    <div class="score"> 00 </div> 
    <div class = "vf-foot">
      <div class="precedent">
        <span> Début de questions </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
      </div> 
      <div class = "valider"> Vérifier </div> 
      <div class = "suivant">
        <span> Fin de questions </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
      </div>
   
</div>`
    return html
  }
}