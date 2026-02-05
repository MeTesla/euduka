
import { closeAct, homeAct } from '../misc/closeAct.js'
import { entete } from '../misc/entete.js'
import { chapitre1 } from '../../bd/roman/chapitre1.js'
import { chapitre2 } from '../../bd/roman/chapitre2.js'
import { chapitre3 } from '../../bd/roman/chapitre3.js'
import { chapitre4 } from '../../bd/roman/chapitre4.js'
import { chapitre5 } from '../../bd/roman/chapitre5.js'
import { chapitre6 } from '../../bd/roman/chapitre6.js'
import { chapitre7 } from '../../bd/roman/chapitre7.js'
import { chapitre8 } from '../../bd/roman/chapitre8.js'
import { chapitre9 } from '../../bd/roman/chapitre9.js'
import { chapitre10 } from '../../bd/roman/chapitre10.js'
import { chapitre11 } from '../../bd/roman/chapitre11.js'
import { chapitre12 } from '../../bd/roman/chapitre12.js'

export function lecteur(n) {
  const lect = document.createElement('div')
  lect.classList.add('lecteur')
  lect.innerHTML = codeHtml()
  document.body.appendChild(lect)

  //  home & close
  let home = document.querySelector('.home')
  home.onclick = () => { homeAct(lect) }
  let close = document.querySelector('.close')
  close.onclick = () => { closeAct(lect); }


  // -- ajouter contenu dyn à l'element
  let rContent = document.querySelector('.r-content')
  let chaps = [chapitre1, chapitre2, chapitre3, chapitre4, chapitre5, chapitre6, chapitre7, chapitre8, chapitre9, chapitre10, chapitre11, chapitre12]
  rContent.innerHTML = chaps[n]

  // gestion sélection de texte vocabulaire 
  rContent.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    let selection = document.getSelection();
    let range = selection.getRangeAt(0);
    let selectedText = range.cloneContents();
    let span = document.createElement('span');
    span.style.color = "var(--secf)"
    span.style.fontWeight = "bold"
    span.appendChild(selectedText)

    span.addEventListener('click', (ev) => {
      console.log(span.innerHTML);
      if (document.querySelector('.dropMenu')) {
        document.querySelector('.dropMenu').remove()
      }

      let dropMenu = document.createElement('div')
      dropMenu.setAttribute('class', 'dropMenu')
      if ((ev.pageX + 70) >= document.body.offsetWidth) {
        dropMenu.style.right = "0px"
      } else {
        dropMenu.style.left = "0px"
      }
      if ((ev.pageY + 70) >= document.body.offsetHeight) {
        dropMenu.style.bottom = "20px"
      } else {
        dropMenu.style.top = "20px"
      }
      span.appendChild(dropMenu)

    })

    range.deleteContents()
    range.insertNode(span)
    selection.removeAllRanges()
  })

  // show / hide bars
  const content = document.querySelector('.r-content')
  const h = document.querySelector('.controls-h')
  const f = document.querySelector('.controls-f')
  let count
  content.addEventListener('click', (ev) => {
    if (ev.target.tagName == 'SPAN') return
    clearTimeout(count)
    h.classList.toggle('hide')
    f.classList.toggle('hide')
    hideBars()
  })
  function hideBars() {
    count = setTimeout(() => {
      if (!(h.classList.contains('hide'))) {
        f.classList.toggle('hide')
        h.classList.toggle('hide')
      }
    }, 4000)
  }

  // bars controls : Plus, minus
  let size = parseInt(window.getComputedStyle(rContent).fontSize)
  const plus = document.querySelector('.p')
  const minus = document.querySelector('.m')
  plus.onclick = () => {
    if (size >= 24) return
    size += 2
    rContent.style.fontSize = size + "px"
  }
  minus.onclick = () => {
    if (size <= 13) return
    size -= 2
    rContent.style.fontSize = size + "px"
  }

  // Bars controls : pages. Le code ne marche pas encore
  let readerH = 0
  const r = rContent.querySelectorAll('p');
  for (let i = 0; i < r.length; i++) {
    readerH += r[i].offsetHeight
  }
  const pageNbr = 20;
  const pageHeight = readerH / pageNbr
  let scrolled = 0
  let page = 0
  let tmp = 0
  rContent.onscroll = () => {
    scrolled = rContent.scrollTop;
    if (scrolled >= tmp) {
      page += 1;
      scrolled += scrolled;
      tmp = scrolled;
      console.log(page);
    }
  }

  function codeHtml() {
    const html = `${entete(n)}
 <div class="r-container">
  <div class="controls-h hide">
   <span class="m"><img src="/client/assets/img/minus.svg" alt="minus"></span>
   <span class="p"><img src="/client/assets/img/plus.svg" alt=""></span>
   <span class="dots"><img src="/client/assets/img/dots.svg" alt=""></span>
  </div>
  
 <div class="r-content">  </div>
 
  <div class="controls-f hide">
   <div class="line-c">
    <span class="indicateur"></span>
   </div>
   <div class="n-pages"> 12/20 </div>
  </div>
 </div>
  
<style>
.llecteur {
 position: absolute;
 top: 0;
 width: 100% ;
 height: 100vh;
 background-color: var(--pr);
 animation: op .2s;
}

.lecteur .r-container {
 position: relative;
 width: 96%;
 height: 80%;
 margin: auto;
 background-color: var(--secc);
 color: var(--secf) ;
 border-radius: 10px;
 border :4px solid var(--comp);
 overflow:hidden;
}

.lecteur .controls-h{
 position: absolute;
 width: 100%;
 height: 40px;
 padding: 10px;
 background-color : var(--comp);
 color: var(--pr) ;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 gap: 25px;
 font-size: 25px;
 font-weight: bold;
 z-index: 3;
}

.lecteur .hide{
 visibility: hidden;
 opacity: 0;
 transition: 0.6s all ease-out;
}
.lecteur .m img,.p img{
 height : 15px;
}
.lecteur .dots img{
 height :18px;
}

.lecteur .r-content{
 height: 100%;
 width: 100%;
 overflow: scroll;
 padding: 15px;
}
.lecteur .r-content p{
 margin-bottom: 10px;
 text-indent: 15px;
 text-align: justify;
}

.lecteur .controls-f{
 height:40px;
 width: 100%;
 position: absolute;
 z-index: 3;
 bottom: 0px;
 background-color : var(--comp); 
 display: flex;
 align-items: center;
 padding: 0 5px;
}

.lecteur .line-c{
 position: relative;
 width: 85%;
 height: 2px;
 background-color: var(--pr);
 margin: 0 5px;
}
.lecteur .indicateur{
 position: absolute;
 top: -4px; left: 50px;
 width: 10px;height: 10px;
 border-radius: 50%;
 background-color: var(--pr);
}
.n-pages{
 color: var(--pr);
 font-size: 12px;
}

.lecteur span{
	position: relative;
}
.lecteur .dropMenu{
	position: absolute;
	width: 70px; height: 70px;
	background-color: var(--comp);
	border-radius: 10px;
	box-shadow: 0 0 2px var(--sec);
	z-index:2;
	animation: h 0.4s;
	transform-origin: top;
	zindex: 2;
}  
@keyframes h{
from{opacity: 0;}  
to{opacity: 1;}
}
 </style>`
    return html
  }
}//End function lecteur