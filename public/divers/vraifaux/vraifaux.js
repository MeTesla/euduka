/*
1- préparer BD
2-  user flow : 
  charger le DOM ->
  choisir une réponse -> 
  verifier ->feed -> 
  suivant /précédent ->
  charger DOM

3-  onvertir /n => array of objects => shuffle qsts
      glb currentQst, score, choosenRep, repondu[]
      load(
        Tests: 
          clear selection
          isAnswered
          choosenRep
          choisir 1 qst et l'afficher au DOM
          gerer qst répondu : if(repondu) else   ()
        load question in DOM
      suivant.eventlistener  if currentQst< questions.length {current++ loadQst}
      precedent.eventlistener  if currentQst>0 {current-- loadQst}
      valider.eventLi
        answered=true
*/
let audio = new Audio()
audio.volume=0.1

const questions = [
{'question': 'Sidi Mohammed était un enfant heureux', 'rep': 'faux'},
{'question': 'Les événements du roman se déroulent à Fès.', 'rep': 'vrai'},
{'question': 'Lalla Aicha était l\'amie intime et la confidente de Lalla Zoubida.', 'rep': 'vrai'},
{'question': 'Maâlem Abdeslam était un homme sévère et méchant', 'rep': 'faux'},
{'question': 'Le narrateur est le personnage principal', 'rep':'vrai'},
{'question': 'Le fqih était un homme doux et clément.', 'rep':'faux'},
{'question': 'Le Msid est un espace de joie pour le narrateur.', 'rep':'faux'},
{'question': 'Sidi Mohammed avait un petit frère', 'rep':'faux'},
{'question': 'La chouafa était la tante de Sidi Mohammed', 'rep':'faux'},
{'question': 'Maâllem Abdeslam était babouchier', 'rep':'faux'},
{'question': 'Lalla Zoubida était une femme bavarde', 'rep':'vrai'},
{'question': 'Le narrateur avait six ans', 'rep':'vrai'},
{'question': '« La Boîte à merveilles » est une œuvre écrite en 1952.', 'rep':'vrai'},
{'question': '« La Boîte à merveilles » est publié en 1952', 'rep':'faux'},
{'question': '« La boite à merveilles est une nouvelle réaliste.', 'rep':'faux'},
{'question': 'Sidi Mohammed apprécie Zineb.', 'rep':'faux'},
{'question': 'La Boîte à merveilles contenait des objets hétéroclites et ordinaires.', 'rep':'vrai'},
{'question': 'Lalla Zoubida et Rahma se réconcilient le jour de la disparition de Zineb.', 'rep':'vrai'},
{'question': 'Lalla Zoubida s\'est disputée avec Rahma à cause des enfants.', 'rep':'faux'},
{'question': 'Grace à son imagination, Sidi Mohammed se sent différent des enfants de son âge.', 'rep':'vrai'},
{'question': 'Lalla Zoubida est une femme discrète (timide).', 'rep':'faux'},
{'question': 'Sidi Mohammed considère les objets de sa Boîte comme ses seuls amis.', 'rep':'vrai'}]
//DOM variables
const question=document.querySelector('.question')
const vraiBtn=document.querySelector('.vrai')
const fauxBtn=document.querySelector('.faux')
const rep=document.querySelectorAll('.rep')
const valider=document.querySelector('.valider')
const suivant= document.querySelector('.suivant')
const precedent= document.querySelector('.precedent')
const score = document.querySelector('.score')
const numQst = document.querySelector('.num-qst')

//Global variables
let currentQst=0, myScore=0, choosenRep, repondu=[], answered

//Shuffle questions
const shuffleQuestions= questions.sort(function(a, b){return 0.5 - Math.random()})

// LOAD QUESTIONS
loadQst()
function loadQst(){
  selection()
  answered = false
  choosenRep=""
  question.innerHTML= questions[currentQst].question

  if (repondu.includes(currentQst+1)){
    valider.style.opacity="0.6"
    valider.removeEventListener('click',valid)
  }else{
    valider.style.opacity="1"
    valider.addEventListener('click',valid)
  }

}

//Gestion des réponses : clique sur VRAI - FAUX
rep.forEach((item)=>{
  item.addEventListener('click',()=>{
    if(answered==true) return
    choosenRep = item.innerText.toLowerCase()
    selection()
    item.classList.add('selected')
    audio.src='../assets/audios/click.mp3'
    audio.play()
  })
})

suivant.addEventListener('click', () =>{
  if(currentQst < questions.length-1){
   currentQst++   
   loadQst()
  }
})

precedent.addEventListener('click', () =>{
  if(currentQst>0){
   currentQst--     
   loadQst()
  }  
})
 
valider.addEventListener('click', valid)

function valid(){
  // vérifier si la qst est déjà traitée=>removeEventList
  // vérifier s'il y a une selection
  answered=true
  let audioFeed = new Audio()
  if(choosenRep){
      repondu.push(currentQst+1)
      valider.style.opacity="0.6"
      valider.removeEventListener('click',valid)
      selection()

      if(choosenRep === questions[currentQst].rep){
        myScore+=10
        score.innerText = myScore
        audio.src='../assets/audios/yay.mp3'
        audio.play()
      } else{
        audio.src='../assets/audios/wrong.mp3'
        audio.play()
      }

  } 
}

function selection(){
  for(let x=0; x<2;x++){
     rep[x].classList.remove('selected')
  }
}