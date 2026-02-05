
import {closeAct,homeAct} from '../misc/closeAct.js'
import {entete} from '../misc/entete.js';


export function resume(bloc, data){
const div=document.createElement('div');
div.className='resume-blc';
div.innerHTML=codeHTML()
bloc.appendChild(div)

 let home = document.querySelector('.home')
 home.onclick = ()=> { homeAct(div) }
 
 let close = document.querySelector('.close')
 close.onclick = ()=> { closeAct(div); }

const resContainer=document.querySelector('.res-container')

// const resume =data.forEach((chapitre, index)=>{
//   const chapitre=document.createElement('h2')
//   const detailChapitre=document.createElement('p')
//   h2.innerText="chapitre" + index
//   detailChapitre.innerHTML = chapitre
// })
resContainer.innerHTML=data

function codeHTML(){
 const html=`${entete()}
  <div class="res-container">  </div>
  <style>
  .entete{
   height: 10vh;
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0 15px;
  }
  
  svg{
   width: 30px;
   height: 30px;
   fill: var(--sec);
  }
  
  .res-titre {
   height: 12vh;
   margin: 0;
   background-color: #bbc2b400;
   color: rgb(253, 253, 253);
   text-align: center;
   /* border: 1px solid white; */
  }
  
  .res-container{
   width: 95%;
   height: 85vh;
   margin: auto;
   overflow: scroll;
   border-radius: 10px;
   background-color: var(--secc);
   border: 1px solid var(--comp);
  }
  
  .res-container h2{
    font-size: 1.2rem;
    text-align: center;
    padding: 20px 0;
    border: 1ps solid gray;
    background-color: var(--comp);
    color: white;
  }
  .res-container div{
   padding: 15px 10px;
   background-color: var(--pr);
   text-indent: 15px;
   font-size: 1rem;
   text-align: justify;
   word-spacing: 6px;
   transition: 1s all;
   color: #333;

  }
   </style>
 </div>`
 return html
}
}