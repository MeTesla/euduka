export function connecter(){
 const html=`<section class="header">
  <div class="logo">EUDUKA</div>
  <div class="titre">Se connecter</div>
 </section>
 <div class="wave">
  <img src="./assets/img/wave.svg" alt="">
 </div>
 <section class="forumlaire">
  <div class="form-container">
   <div class="grp-nom">
    <label for="text">Nom</label>
    <input type="text" name="text" id="nom"/>
   </div>
   <div class="grp-pw">
    <label for="pw">Mot de passe</label>
    <input type="password"  id=""pw>
   </div>
  </div> 
  <div class="seconnecter">Se connecter </div>
  <div class="oublie">
   As-tu oublié le mot de passe ? 
  </div>
  <div class="ou">Ou bien</div>
  <div class="creer">Créer un compte </div>
   
  <style>
   *{margin: 0; padding:0; box-sizing: border-box;}
   :root{
    --blue: #7E57C2;
    --vert: #086972;
   }
   .header{
    position: relative ;
    height: 20vh;
    background-color: var(--blue);
    color: white;
    display: flex; flex-direction: column;
    align-items:center;justify-content:center
   }
   .header .logo{
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin-top :50px ;
   }
   .header .titre{
    font-size: 1.7rem;
    margin-top: 20px;
   }
   .wave{
    width: 100%;
    height: 100px;
   }
   .wave img{
    width: 100%;
    position :relative ;
    z-index :-1;
   }
   .form-container{
    position :relative ;
    width: 100%;
    height :150px;
    bborder: 5px solid black ;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center; gap: 20px;
   }
   .grp-nom, .grp-pw{
    position: relative;
   }
   .grp-nom label, .grp-pw label{
    position: absolute;
    top:-10px; left: 20px;
    width: 60px;
    background-color: white;
    text-align: center;
    color: gray;
   }
  .grp-pw label{
   width: 110px;
  }
   .grp-nom input, .grp-pw input{
    width: 250px;
    height: 40px;
    padding: 0 15px;
   }

   .creer, .seconnecter{
    width: 70%;
    height:40px;
    font-size: 1rem;
    border: 1px solid gray;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    margin: 10px auto;
    background-color: var(--vert);
    color: white;
   }
   .seconnecter{
    background-color: var(--blue);
   }
  .oublie{
   text-align: center ;
   color :gray ;
   margin:5px 0 20px;
  }
   .ou{
    text-align: center;
    color: gray;
   }
  </style>
 </section>`
 
const connect=document.createElement('div')
connect.innerHTML=html
connect.classList.add('connecter')
document.body.appendChild(connect)
}