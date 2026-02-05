const l = console.log
import { closeAct, homeAct } from '../misc/closeAct.js'
import { entete } from '../misc/entete.js'
import { handleResultats, sliceScores } from '../misc/utils.js'
import { getProfile } from '../../utils/storage.js'
import { EventManager } from '../../utils/eventManager.js'

export function ordrePhrases(bloc, data, callBack) {
   // Gestionnaire d'événements avec cleanup automatique
   const events = new EventManager()

   const div = document.createElement('div');
   div.classList.add('ordre-ph')
   div.innerHTML = htmlCode()
   bloc.appendChild(div)

   let home = document.querySelector('.home')
   home.onclick = () => { homeAct(div) }

   let close = document.querySelector('.close')
   close.onclick = () => { closeAct(div); }

   // let p="je suis fatigué de courir toute la journée";

   // console.log(p.split(" ").sort(function(a, b){return 0.5 - Math.random()}).join(" "));

   // --------DOM varibles
   var score = document.querySelector('.score')
   const progress = document.querySelector('.progress')
   var recepteur = document.querySelector('.recepteur')
   var emetteur = document.querySelector('.emetteur')
   var verifier = document.querySelector('.valider')
   var resultat = document.querySelector('.resultat')
   var message = document.querySelector('.message')
   var bnRep = document.querySelector('.bn-rep')
   var voirRep = document.querySelector('.voir-rep')
   var suivant = document.querySelector('.ph-suivante')
   var refaire = document.querySelector('.ph-refaire')
   // -------- GLOBALS
   var index = 0
   var monScore = 0
   const nbrPhrases = 4
   var audio
   let phraseInOrder = []
   let sessionPhrases = []
   verifier.addEventListener('click', verifierFunc)

   // Choisir 8 phrases
   data.sort(function (a, b) { return 0.5 - Math.random() })

   loadPhrase()
   function loadPhrase() {
      // Load phrases on DOM
      let unePhrase = data[index].split(" ")
      sessionPhrases.push(data[index])
      phraseInOrder = [...unePhrase]
      unePhrase.sort(function (a, b) { return 0.5 - Math.random() })
      unePhrase.forEach((item) => {
         let span = document.createElement('span');
         span.innerHTML = item;
         emetteur.appendChild(span)

         progress.style.width = (100 / nbrPhrases) * (index + 1) + '%'
         bnRep.innerText = ""
         events.on(span, 'click', (ev) => {
            if (ev.target.parentElement == emetteur) {
               recepteur.appendChild(ev.target)
            } else {
               emetteur.appendChild(ev.target)
            }
         })
      })
   }

   function verifierFunc() {
      if (!recepteur.hasChildNodes()) return
      resultat.style.bottom = "0"
      if (recepteur.innerText == phraseInOrder.join("")) {
         message.style.color = "var(--correct)"
         message.innerText = "C'est correct"
         monScore += 10
         score.innerText = monScore
         //audio = new Audio('../../assets/audios/yay.mp3')
         //audio.play()
         voirRep.style.display = "none"
      } else {
         voirRep.style.display = "block"
         message.innerText = "C'est incorrect !"
         bnRep.style.opacity = "0";
         bnRep.innerHTML = `La réponse est : <span> ${phraseInOrder.join(' ')}</span>`
         message.style.color = "var(--incorrect)"
         audio = new Audio('../../assets/audios/wrong.mp3')
         audio.volume = "0.4"
         audio.play()
      }
   }

   // addEventListernner !== onclick IMAGIIIiIIIIINE
   suivant.addEventListener('click', () => {
      if (index < nbrPhrases) {
         index++
         reinitialiser()
      } else {
         resultat.style.bottom = "0"
         resultat.innerHTML = `<h1 style="color: var(--comp)">FIN de session</h1>`

         // Créer tableau où stocker les phrases de la session
         // score = monScore
         // Travailler au click sur suivant et non verifier
         const profileScores = getProfile()?.resultats?.ordrePhrases?.scores || []
         let resultatOrdrePhrases = {
            ordrePhrases: {
               score: monScore / 10,
               scores: [...sliceScores(profileScores), monScore / 10],
               nbrQsts: nbrPhrases + 1,
               date: new Date().toLocaleDateString('fr-FR'),
               lastSession: sessionPhrases
            }
         }
         callBack(true)
         handleResultats(resultatOrdrePhrases)
      }


   })

   refaire.onclick = () => reinitialiser()
   voirRep.onclick = () => {
      bnRep.style.opacity = "1";
      voirRep.style.display = "none"
   }

   function reinitialiser() {
      events.cleanup()
      emetteur.innerHTML = ""
      recepteur.innerHTML = ""
      resultat.style.bottom = "-100vh"
      loadPhrase()

   }


   function htmlCode() {
      let html = `${entete()}
  <div class="q-header">
  <div class="progress-bar">
    <div class="progress"></div>
  </div>  
  
 </div>
    <div class="q-content">
       <div class="recepteur"></div>
       <div class="score">00 </div>
       <div class="emetteur"></div>
    </div>
 <div class="q-foot">
   <div class="valider">Vérifier </div> 
 </div>
 <div class="resultat">
   <div class="res-cont"> 
      <div class="message"> </div>
      <div class="bn-rep"> </div>
      <div class="ph-options">  
        <div class="ph-suivante"> Suivant </div>
        <div class="ph-refaire"> Refaire </div>
        <div class="voir-rep"> Voir la réponse </div>
      </div>  
   </div>
</div>
 <style>
.ordre-ph .q-header{
   display: flex;
   justify-content: space-between;
   width: 100%;
   height: 50px;
   margin: 10px 0;
}

.ordre-ph .progress-bar{
   width:300px;
   height: 10px;
   border: 1px solid var(--secc);
   position: relative;
   border-radius: 10px;
   overflow: hidden;
   margin: auto;
}

.ordre-ph .progress{
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  width: 30%;
  transition: .5s ease-out;
  background-color: var(--comp);
}

.ordre-ph .score{
   height: 50px;
   width: 50px;
   line-height: 50px;
   text-align: center;
   margin: 15px auto;
   border: 2px solid var(--sec);
   box-shadow: 0 0 10px var(--sec);
   border-radius: 50%;
   box-sizing: content-box;
   font-size: 25px;
}

.ordre-ph .recepteur, .ordre-ph .emetteur{
    width:94%; 
    min-height:22vh;
    border:1px solid var(--sec);
    border-radius: 20px;
    margin: 10px auto;
    padding: 10px;
    background-color: var(--secc) ;
}

.ordre-ph .emetteur span, .ordre-ph .recepteur span{
   display: inline-block;
   padding: 5px 15px;
   text-align: center;
   font-size: 16px;
   margin: 3px;
   border-radius: 8px;
   background-color: var(--pr);
   color: var(--secf);
   font-weight :500 ;
   bborder: 1px solid var(--comp) ;
   /*cursor: pointer; cree prob dans mobile*/
   user-select: none;
}

.emetteur span:active, .recepteur span:active{
 transform: scale(.95);
}
.correct{
    background-color: green;
    transition :.3s all;
}
.incorrect{
    background-color: red;
}

.resultat{
   height: 90vh;
   width: 100%;
   position: absolute; 
   bottom:-100vh;
   display:flex;
   align-items: center;
   justify-content: center; 
   background-color: rgba(255,255,255);
   transition: .2s ease-in-out;
}   

.resultat .res-cont{
   hheight: 200px;
   width: 90%;
   border-radius: 10px;
   margin: 0 auto;
   background-color: var(--pr);
   border: 1px solid var(--sec);
   padding: 20px;

}
.message{
   font-size: 2rem;
   height: 40px;
   text-align: center;
   ccolor: var(--);
}
.bn-rep{
  margin: 25px auto;
  opacity: 0;
  transition: opacity 0.3s;
}
.bn-rep span{
   ccolor: var(--correct);
   font-weight: bold;
}
.ph-options{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.ph-options > div {
   color: var(--pr);
   width: 70%;
   border-radius: 20px;
   margin: auto;
   font-size: 16px;
   background-color: var(--comp);
   text-align: center;
}
 </style>`
      return html
   }
}