import {closeAct, homeAct} from '../misc/closeAct.js'
import {entete} from '../misc/entete.js'
import {phrases} from '../../bd/ordrePh-db.js'
// 
export function ordrePhrases(n){
 const div=document.createElement('div');
 div.classList.add('ordre-ph') 
 div.innerHTML = htmlCode()
 document.body.appendChild(div)
 
 let home = document.querySelector('.home')
 home.onclick = () => { homeAct(div) }
 let close= document.querySelector('.close')
 close.onclick = () => { closeAct(div); }
  
  
// --------DOM varibles
var score = document.querySelector('.score')
var timer = document.querySelector('.timer')
var recepteur = document.querySelector('.recepteur')
var emetteur = document.querySelector('.emetteur')
var verifier = document.querySelector('.valider')
var resultat = document.querySelector('.resultat')
var message = document.querySelector('.message')
var suivant = document.querySelector('.qst-suivante')
// -------- GLOBALS
var currentQst = 0
var monScore = 0
var interval
var time
var audio
var phrase, tabPhraseTemp, maPhrase, tabPhrase

//--------- Logic -----------
//charger dans tabPhrase les mots en désordre.
loadQst()
verifier.addEventListener('click', verifierFunc)
btnSuivant()

// --------FUNCTIONS --------------
  //Préparation des phrases ----
function prepareQst(){
   // choix aléa de 10 phrases
phrase = phrases[Math.floor(Math.random()* phrases.length)]

   // split la phrase en mots
tabPhraseTemp = phrase.split(" ");

   // joindre les mots de nouveau en tabl 
maPhrase = tabPhraseTemp.join("")
tabPhrase = []

//charger dans tabPhrase met désordre
for (var j = 0; j < tabPhraseTemp.length; j++) {
   var indexAlea = Math.floor(Math.random() * tabPhraseTemp.length);
   tabPhrase.includes(tabPhraseTemp[indexAlea]) ? j -= 1 : tabPhrase.push(tabPhraseTemp[indexAlea]);
 }
}

//créer les span et gérer clic + déplace
function loadQst(){
 clearInterval(interval)
 time= 15
 interval = setInterval(compteur, 1000)
prepareQst()
for(var i=0; i<tabPhrase.length; i++){
  let mot = tabPhrase[i]
  var span = document.createElement('span')
  span.innerHTML = mot;
  emetteur.appendChild(span)
  span.addEventListener('click', (ev)=>{
   if(ev.target.parentElement == emetteur)
   {
   recepteur.appendChild(ev.target) //ev = objet 'click' / target = objet sur lequel on click
   } else{
      emetteur.appendChild(ev.target)
   }
  })
}
}

function verifierFunc(){
   resultat.style.bottom= "0"
   if(recepteur.innerText==maPhrase){
       message.innerText = "C'est correct, Bravo !"
       monScore += 10
       score.innerText = monScore
       audio = new Audio('../assets/ordrePhraseAudio/correct.mp3')
       //audio.play()
    } else{
       message.innerText = "C'est incorrect !"
      audio = new Audio('../assets/ordrePhraseAudio/wrong.mp3')
      audio.volume = "0.4"
      //audio.play()
     }
   
   clearInterval(interval)
   timer.innerText = "00s"  
}

function btnSuivant(){
   suivant.addEventListener('click', () => {
      currentQst++
   if (currentQst < 6){
      emetteur.innerHTML = ""
      recepteur.innerHTML = ""
         loadQst()
         resultat.style.bottom = "-200px"
      }
   else{
      document.querySelector('.ordre-ph').innerHTML = ""
      clearInterval(interval)
   }
   })
}

 function compteur(){
   if(time>0){
    time--
    timer.innerText = time
      if (time < 10) {
         timer.innerText = '0' + time + 's'
      }
      else { timer.innerText = time + 's' }
   } else { 
         suivant.click()
   }
 }
 function htmlCode(){
 let html=`${entete(n)}
  <div class="q-header">
  <div class="progress">
     <img src="../assets/ordrePhraseImages/timer2.png" alt="">
     <span class="timer">15s</span>
  </div>  
  <div class="heart">
     <img src="../assets/ordrePhraseImages/heart.png" alt="">
     <span class="score">00</span>
  </div>  
 </div>
    <div class="q-content">
       <div class="recepteur"></div>
       <div class="emetteur"></div>
    </div>
 <div class="q-foot">
   <div class="valider">Vérifier </div> 
 </div>
 <div class="resultat">
    <div class="message"></div>
    <div class="qst-suivante">Suivant</div>

 <style>
 .oordre-ph{
   height: 100vh;
   width: 100vw;
   padding: 15px;
   position: absolute;
   top: 0;
   left:0;
   background-color: var(--pr);
   transition: 1s;
}
.ordre-ph .q-header{
   display: flex;
   justify-content: space-between;
   width: 100%;
   height: 50px;
   margin: 10px 0;
}
.ordre-ph .q-header .heart, .ordre-ph .q-header .progress{
   line-height: 30px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 50px;
   margin :0 20px;
}
.ordre-ph .q-header .heart img, .ordre-ph .q-header .progress img{
   width: 30px;
   margin :0 5px;
 }
 
.ordre-ph .heart .timer, .ordre-ph .progress .score{
   height: 20px;
}

.ordre-ph .recepteur, .ordre-ph .emetteur{
    width:96%; 
    min-height:25vh;
    border:1px solid var(--sec);
    border-radius: 20px;
    margin: 10px auto;
    padding: 15px 10px;
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
   height: 200px;
   width: 100%;
   position: absolute;
   bottom:-200px;
   left: 0;
   background-color: #7EBA2F;
   transition: .5s ease-in-out;
   text-align: center;
   lline-height: 200px;
   font-size: 2rem;
   font-weight: bold;
   color: #FFFFFF;
}

.message{
   margin-top: 30px;
}

.qst-suivante{
   width: 120px;
   box-shadow: 0 0 4px white;
   padding: 5px;
   border-radius: 20px;
   margin: 20px auto;
   font-size: 24px;
   background-color: #eEB42F;
}
 </style>
 </div>`
 return html
} 
}