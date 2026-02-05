// // Change l'URL
//     history.pushState({ modal: true }, '', '/client/quiz');

//     closeQuizButton.addEventListener('click', () => {
//         document.body.removeChild(quizModal); // Supprime le modal
//         history.pushState({ modal: false }, '', '/'); // Remet l'URL à l'original
//     });

//     // Gestionnaire d'événements pour la navigation avec le bouton "Précédent"
//     window.addEventListener('popstate', (event) => {
//         if (event.state && event.state.modal) {
//             // Si l'état indique que le modal doit être ouvert
//             document.body.appendChild(quizModal);
//         } else {
//             // Cache le modal (s'il est ouvert))
//             if (document.body.contains(quizModal)) {
//                 document.body.removeChild(quizModal);
//             }
//         }
//     });
// }

const l = console.log
import { closeAct, homeAct } from '../misc/closeAct.js'
import { entete } from '../misc/entete.js'
import { modalFinSession } from '../../utils.js'
import { confet } from '../misc/utils.js'
import { handleResultats } from '../misc/utils.js'
import { sliceScores } from '../misc/utils.js'
import { getProfile } from '../../utils/storage.js'

export function qcm(bloc, data, callBack = () => false) {


  const div = document.createElement('div')
  div.innerHTML = codeHtml()
  div.classList.add('qcm')
  bloc.appendChild(div)




  // entete close / home
  let home = document.querySelector('.home')
  home.onclick = () => { homeAct(div) }

  let close = document.querySelector('.close')
  close.onclick = () => {

    closeAct(div);
  }

  // DOM variables: 
  const qst = document.querySelector('.qst')
  const choix1 = document.querySelector('.c1')
  const choix2 = document.querySelector('.c2')
  const choix3 = document.querySelector('.c3')
  const choix = document.querySelectorAll('.choix')

  const suivant = document.querySelector('.suivant')
  const precedent = document.querySelector('.precedent')
  const valider = document.querySelector('.valider')
  const score = document.querySelector('.score')
  const progress = document.querySelector('.quiz-container .progress')

  //JS GLOBALS
  let questions = []
  let currentQuestion = 0, monScore = 0
  let choosenQuestion, repondu = [], answered
  let index = 0, nbrQst = 4, nbrSession = 1

  // --------------------- QUIZ logic --------------------
  function convertData(dataToConvert) {
    let arrayOfObj = []
    if (typeof (dataToConvert) === 'object') {
      arrayOfObj = [...dataToConvert]
      return dataToConvert
    } else {
      let myArray = data.split('\n')
      let myObj = {}
      for (let i = 0; i < myArray.length; i += 5) {
        myObj.qst = myArray[i]
        myObj.c1 = myArray[i + 1]
        myObj.c2 = myArray[i + 2]
        myObj.c3 = myArray[i + 3]
        myObj.rep = myArray[i + 4]
        arrayOfObj.push(myObj)
        myObj = {}
      }
      return arrayOfObj
    }
  }

  let arrayOfObj = convertData(data)

  // shuffle questions
  // arrayOfObj.sort(function (a, b) { return 0.5 - Math.random() })
  arrayOfObj.sort(function (a, b) { return 0.5 - Math.random() })

  //charger n questions dans un tableau
  for (let i = index; i < index + nbrQst; i++) {
    questions.push(arrayOfObj[i])
  }


  // DOM / UI
  loadQst()
  function loadQst() {
    selection()
    answered = false
    choosenQuestion = ""
    progress.style.width = (100 / questions.length) * (currentQuestion + 1) + '%'

    //shuffle les choix
    let question = [questions[currentQuestion].c1, questions[currentQuestion].c2, questions[currentQuestion].c3]
    question.sort(function (a, b) { return 0.5 - Math.random() })
    // DOM
    qst.innerText = questions[currentQuestion].qst
    choix1.innerText = question[0]
    choix2.innerText = question[1]
    choix3.innerText = question[2]

    // TEST des réponses faites
    if (repondu.includes(currentQuestion + 1)) {
      valider.style.opacity = "0.6"
      valider.removeEventListener('click', valid)
    } else {
      valider.style.opacity = "1"
      valider.addEventListener('click', valid)
    }
  }

  // Sélection d'un choix
  let mesChoix = Array.from(choix)
  mesChoix.forEach((item) => {
    item.addEventListener('click', () => { selectChoix(item) })
  })

  function selectChoix(item) {
    if (answered == true) return
    choosenQuestion = item
    selection()
    // Ce code marche : for(let choix of mesChoix){choix.classList.remove('selected')}
    item.classList.add('selected')
    let audio = new Audio()
    audio.volume = 0.1
    audio.src = './assets/audios/click.mp3'
    audio.play()
  }

  suivant.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++
      loadQst()
    } else {
      suivant.querySelector('span').style.display = "block"
      setTimeout(() => {
        suivant.querySelector('span').style.display = "none"
      }, 700);
    }
  })

  precedent.addEventListener('click', () => {
    if (currentQuestion > 0) {
      currentQuestion--
      loadQst()
    } else {
      precedent.querySelector('span').style.display = "block"
      setTimeout(() => {
        precedent.querySelector('span').style.display = "none"
      }, 700);
    }
  })

  valider.addEventListener('click', valid)

  function valid() {
    let audioFeed = new Audio()
    if (choosenQuestion) {
      answered = true
      repondu.push(currentQuestion + 1)
      valider.style.opacity = "0.6"
      valider.removeEventListener('click', valid)
      selection()
      if (choosenQuestion.innerHTML === questions[currentQuestion].rep) {
        monScore += 10
        score.innerText = monScore
        let audio = new Audio()
        audio.volume = 0.02
        audio.src = './assets/audios/yay.mp3'
        //audio.play()
        confet()
        choosenQuestion.classList.add('reponseCorrect')
      } else {
        let audio = new Audio()
        audio.volume = 0.1
        audio.src = './assets/audios/wrong.mp3'
        audio.play()
        //supprimer class de la question suvivante.
        choosenQuestion.classList.add('reponseIncorrect')
        const reponseCorrect = mesChoix.filter((repo) => {
          return repo.innerText == questions[currentQuestion].rep.trim()
        })
        reponseCorrect[0].classList.add('reponseCorrect')
      }
    }

    let resultat = {
      score: monScore / 10,
      nbrQst: nbrQst,
      end: nbrSession
    }
    if (repondu.length == nbrQst) {
      const profileScores = getProfile()?.resultats?.qcm?.scores || []
      let resultatQCM = {
        qcm: {
          score: monScore / 10,
          scores: [...sliceScores(profileScores), monScore / 10],
          nbrQsts: nbrQst,
          date: new Date().toLocaleDateString('fr-FR'),
          lastSession: questions
        }
      }
      handleResultats(resultatQCM)
      callBack(true)
      modalFinSession(div, reinitialiser, resultat)
    }
  }

  function reinitialiser(re) {
    repondu = []
    currentQuestion = 0
    monScore = 0
    progress.style.width = (100 / questions.length) * (currentQuestion + 1) + '%'
    score.innerText = "00"

    if (re) {
      index += nbrQst;
      nbrSession += 1
    }
    questions = []
    for (let i = index; i < index + nbrQst; i++) questions.push(arrayOfObj[i])
    loadQst()
  }

  function selection() {
    for (let x = 0; x < 3; x++) {
      /*choix[x].classList.remove('selected')
      choix[x].classList.remove('reponseCorrect')
      if(choix[x].classList.contains('reponseIncorrect')) choix[x].classList.remove('reponseIncorrect')
      */
      choix[x].className = "choix c" + (x + 1)
    }
  }

  function codeHtml() {
    const html = `${entete()}
<section class="quiz-container">
 <div class="q-head">
  <div class="progress-bar">
   <div class="progress"></div>
  </div>
 </div>

 <div class="q-content">
  <div class="qst"></div>
  <div class="les-choix">
   <div class="choix c1"></div>
   <div class="choix c2"></div>
   <div class="choix c3"></div>
  </div>
 </div>
 <div class="score">00</div>
 <div class="q-foot">
  <div class="precedent">
    <span> Début de questions </span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
  </div>
  <div class="valider">Valider</div>
  <div class="suivant">
    <span> Fin de questions </span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/> </svg>
  </div>
 </div>
</section>`
    return html
  }
}