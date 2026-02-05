function dom(){
 let chapitres=['c1', 'c2', 'c3']
 chapitres.forEach((item, index)=> {
  listAct(index +1)
 })
}
function listAct(num){
 //console.log(num + ' LISTE D ACTIVITÉS');
 lecteur(num)
}
function lecteur(chap){
 //console.log(chap + ' Je suis le LECTEUR');
 bd(chap)
}
function bd(c){
 console.log(c+ '- Tu lis le chapitre : '+c)
}
dom()