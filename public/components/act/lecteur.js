/*
- BG Colors
- Font-family: Poppins
- AdMob UI
*/
import {closeAct,homeAct} from '../misc/closeAct.js'
import {entete} from '../misc/entete.js'


export function lecteur(wrapper, data){
 const lect=document.createElement('div')
 lect.classList.add('lect-blc')
 lect.innerHTML=codeHtml()
 wrapper.appendChild(lect)
 
 //  home & close
 let home=document.querySelector('.home')
 home.onclick=()=> {homeAct(lect)}
 let close =document.querySelector('.close')
 close.onclick = () => {closeAct(lect); }
 

// -- ajouter contenu dyn à l'element
let rContent=document.querySelector('.r-content')
rContent.innerHTML = data
// show / hide bars
 const content=document.querySelector('.r-content')
 const h=document.querySelector('.controls-h')
//  const f=document.querySelector('.controls-f')
 let count
 content.addEventListener('click', (ev)=>{
  if(ev.target.tagName == 'SPAN') return
  clearTimeout(count)
  h.classList.toggle('hide')
  // f.classList.toggle('hide')
  hideBars()
 })
function hideBars(){
  count= setTimeout(()=> {
   if (!(h.classList.contains('hide'))) {
    // f.classList.toggle('hide')
    h.classList.toggle('hide')
   }
  },4000)
 }

 // bars controls : Plus, minus
 let size= parseInt(window.getComputedStyle(rContent).fontSize)
 const plus =document.querySelector('.p')
 const minus =document.querySelector('.m')
 plus.onclick=()=>{
   if(size>=24) return
   size+=2
   rContent.style.fontSize = size + "px"
 }
 minus.onclick=()=>{
   if(size<=13) return
   size-=2
   rContent.style.fontSize = size+ "px"
   }


function codeHtml(){
  const html=`${entete()}
 <div class="r-container">
  <div class="controls-h hide">
   <span class="m"><img src="./assets/img/minus.svg" alt="minus"></span>
   <span class="p"><img src="./assets/img/plus.svg" alt=""></span>
  </div>
  
  <div class="r-content">  </div>
 </div>
  
<style>

.lect-blc .r-container {
 position: relative;
 width: 96%;
 height: 89%;
 
 margin: auto;
 background-color: var(--secc);
 color: var(--secf) ;
 border-radius: 10px;
 border :1px solid var(--comp);
 overflow:hidden;
 font-family: arial, tahoma;
}

.lect-blc .controls-h{
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

.lect-blc .hide{
 visibility: hidden;
 opacity: 0;
 transition: 0.6s all ease-out;
}
.lect-blc .m img,.p img{
 height : 15px;
}
.lect-blc .dots img{
 height :18px;
}

.lect-blc .r-content{
 height: 100%;
 width: 100%;
 overflow: scroll;
 padding: 15px;
}
.lect-blc .r-content p{
 margin-bottom: 10px;
 text-indent: 15px;
 text-align: justify;
}


.lect-blc span{
	position: relative;
}
.lect-blc .dropMenu{
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
@media screen and (max-width: 782px) {
  
}
 </style>`
 return html
 }
}//End function lecteur