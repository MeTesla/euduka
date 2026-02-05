export function entete(){
 
 function codeHTML(){
  const html = `<div class="entete">
     <img class="home" src="./assets/img/euduka.png"> </img> 
    <div class="close">
      <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
    </div>
   
   <style> 
    .entete{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 25px;
      height: 10vh;
    }
    .entete .chap-titre{
      color: black ;
      lletter-spacing: 7px;
      font-weight: 800;
    }
    .entete a{
      text-decoration: none
    }
   .home{
      width: 90px;
   }
     svg{
     width:25px ;
     height :25px;
     fill: var(--sec) ;
    }
    .entete span{
     color: var(--sec) ;
     font-size: 32px;
    }
   </style>
  </div> `
  return html
 }
 return codeHTML()
} // FIN ENTETE
