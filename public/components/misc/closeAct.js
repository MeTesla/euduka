export function closeAct(el) {
  const div = document.createElement('div')
  div.innerHTML = codeHTML();
  el.appendChild(div);

  // معززة هادي MIRACLE
  let oui = document.querySelector('.oui')
  let non = document.querySelector('.non')

  oui.addEventListener('click', () => {
    el.style.animation = "close .3s"
    setTimeout(() => { el.remove() }, 200)
  })
  non.addEventListener('click', () => {
    div.style.animation = "close .6s"
    setTimeout(() => { div.remove() }, 500)
  })
  function codeHTML() {
    const html = `<div class="fermer">
      <div class="modal">
      <div class="msg">
        <div>Voulez-vous vraiment quitter ?</div>
      </div>
      <div class="btns">
        <div class="oui">Oui</div>
        <div class="non">Non</div>
      </div>
    
      <style>
      .fermer{
      position: absolute;
      top:0; left;0;
      width: 100%; height:100vh;
      background-color: rgba(255,255,255, .8);
      z-index: 3;
      animation: s .2s;
      }
      
      .fermer .modal {
      position: absolute;
      top:50%; left:50%;
      transform :translate(-50%,-50%);
      height :140px;
      width :80%;
      background-color : var(--pr);
      border: 1px solid var(--sec);
      padding: 15px;
      border-radius: 20px;
      }
      
      .msg{
      font-size: 18px;
      height: 40%;
      text-align: center;
      margin-top: 15px;
      }
      .btns{
      display:flex;
      justify-content: center;
      gap: 30px;
      
      }
      .oui, .non{
      width: 100px;
      height: 40px;
      line-height: 40px;
      border: 1px solid var(--secc);
      background-color: var(--comp);
      color: var(--pr);
      font-weight: bold;
      fonnt-size: 18px;
      
      text-align: center;
      border-radius: 20px;
      }
      </style>
    </div>`
    return html;
  }
  return div.innerHTML
}

export function homeAct(el) {
  const div = document.createElement('div')
  div.innerHTML = codeHTML();
  el.appendChild(div);


  console.log(el);

  // معززة هادي MIRACLE
  let oui = document.querySelector('.oui')
  let non = document.querySelector('.non')

  oui.addEventListener('click', () => {


    setTimeout(() => {
      location.assign('./index.html')
    }, 100)
  })
  non.addEventListener('click', () => {
    div.style.animation = "close .6s"
    setTimeout(() => { div.remove() }, 500)
  })

  function codeHTML() {
    const html = `<div class="fermer">
        <div class="modal">
        <div class="msg">
          <div>Voulez-vous revenir à la page d'accueil ?</div>
        </div>
        <div class="btns">
          <div class="oui">Oui</div>
          <div class="non">Non</div>
        </div>
      
        <style>
        .fermer{
        position: absolute;
        top:0; left;0;
        width: 100%; height:100vh;
        background-color: rgba(255,255,255, .8);
        animation: s .2s;
        }
        
        .modal {
        position: absolute;
        top:50%; left:50%;
        transform :translate(-50%,-50%);
        height :140px;
        width :80%;
        background-color : var(--pr);
        border: 1px solid var(--sec);
        padding: 15px;
        border-radius: 20px;
        }
        
        .msg{
        font-size: 16px;
        height: 40%;
        text-align: center;
        margin-bottom: 20px;
        }
        .btns{
        display:flex;
        justify-content: center;
        gap: 30px;
        
        }
        .oui, .non{
        width: 100px;
        height: 40px;
        line-height: 40px;
        border: 1px solid var(--secc);
        background-color: var(--comp);
        color: var(--pr);
        font-weight: bold;
        fonnt-size: 18px;
        
        text-align: center;
        border-radius: 20px;
        }
        </style>
      </div>`
    return html;
  }
  return div.innerHTML
}