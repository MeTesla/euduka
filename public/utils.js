//git 
const l = console.log
function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

export function conic(num, nbrItems) {
  const conic = document.createElement('div')
  conic.className = "conic"
  conic.style.background = `conic-gradient(#ECB390 ${(num / nbrItems) * 360}deg, #D1C4E9 ${(num / nbrItems) * 360}deg)`;
  conic.innerHTML = `<span> ${num}/${nbrItems}</span><style>
  .conic{
     position :relative ;
     width: 40px; height : 40px;
     border-radius: 50%;
     /*calcul : pourcentage x 3.6 
     exemple : 25% = 25 x 3.6 = 90deg
     AI : (reponses correctes / nombre de questions) * 360deg
     10 questions, 7 bonnes reponses : (7/10)*360 = 252deg
     5 questions, 3 bonnes reponses : (3/5)*360 = 216deg
     */
     font-size: 0.6rem;
     font-weight: bold;
     display: flex;
     justify-content: center;
     align-items: center;
    }
    .conic:before {
      content: '';
      position: absolute;
      inset: 5px;
      background-color: #F0F0e0;
      border-radius: 50% ;
    }
    .conic span{
      z-index: 0;
    }
  </style>`
  return conic
}

export function modalFinSession(blocParent, reinit, resultat) {
  setTimeout(() => {
    const divModal = document.createElement('div');
    divModal.className = "modal";
    divModal.innerHTML = `<div class="modal-wrapper">
      <div class="resultats">
        <div class="message">
          Session terminée, Voici tes résultats :
        </div>
        <div class="chiffres">
          <div class="final"> <span> Note finale :</span> <span> ${resultat.score}/${resultat.nbrQst}</span></div>
          <div class="rep-correct"><span> Réponses correctes : </span> <span> ${resultat.score}</span> </div>
          <div class="rep-fausse"><span>Réponses fausses : </span> <span>${resultat.nbrQst - resultat.score} </span> </div>
        </div>
      </div>
      <div class="options">
        <div class="refaire"> Refaire la session</div>
        <div class=${resultat.end == 3 ? "hide" : "nouvelle"}>Nouvelle session</div>
        <div class="quitter">Quitter</div>
      </div>
    </div>
    <style>
    .modal{
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0; left: 0;
      display:flex;
      justify-content: center; 
      align-items: center;
      background-color: #B0BEC5;
    }
    .modal-wrapper{
      position: relative;
      width: 85%;
      padding: 30px 15px;
      border: 1px solid darkgray;
      border-radius: 15px;
      margin: auto;
      background-color: #ffffffaa;
      bbackground-image: url('./assets/images/trophy.png');
      background-size: 35%;
      background-repeat: no-repeat;
      background-position: bottom right;
    }
    .resultats .chiffres{
      width: 80%;
      margin : 10px auto;
    }
    .resultats .chiffres > div{
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-weight: bold;
    }
    
    .resultats .chiffres > div span:nth-child(2){
      color: blue;
      font-size: 1.3rem;
    }
      .options{
        ddisplay: flex;
        justify-content: space-evenly;
      }
      
      .options > div{
        width: 60%;
        margin: 10px auto;
        padding: 15px;
        border-radius: 15px;
        background-color: var(--comp);
        color: var(--pr);
        text-align: center;
      }
        .hide{
        display: none
        }
    </style>`
    blocParent.appendChild(divModal);
    const quitter = document.querySelector('.quitter')
    const refaire = document.querySelector('.refaire')
    const nouvelle = document.querySelector('.nouvelle')
    quitter.addEventListener('click', () => {
      divModal.parentElement.remove()
    })
    refaire.addEventListener('click', () => {
      //reinitialiser()
      reinit()
      divModal.remove()
    })
    if (nouvelle) {
      nouvelle.addEventListener('click', () => {
        //reinitialiser('re')
        reinit('re')
        divModal.remove()
      })
    }
  }, 1500)
}

export function uniq() {
  for (let i = 0; i < nbrPhrases; i++) {

    if (mesPhrases.includes(data[index])) {
      i--
    }
    else {
      phrasesInOrder.push(data[index])
      mesPhrases.push(data[index].split(" "))
      //mesPhrases.sort(function(a, b){return 0.5 - Math.random()})
    }

  }

}