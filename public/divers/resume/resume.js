const chapArray=codeHTML()

const blockResume = document.querySelector('.block-res')
const chapitres = document.querySelector('.chapitres')
const reader= document.querySelector('.reader')
const home=document.querySelector('.home')
const accueil=document.querySelector('.accueil-cont')
const titre = document.querySelector('.reader-titre')

for(let i=1; i<=12; i++){
    let divs = document.createElement('div')
    divs.innerHTML = i
    divs.className='chap'
    chapitres.appendChild(divs)
}

const chaps = document.querySelectorAll('.chap')
reader.innerHTML=chapArray[0]
chaps[0].classList.add('selected')
    
chaps.forEach((item, index)=>{
 item.addEventListener('click', ()=>{
  for(let j=0; j<=chaps.length-1;j++){
      chaps[j].classList.remove('selected')
  }
  item.classList.add('selected')
  reader.innerHTML = chapArray[index]
  titre.innerHTML='chapitre ' + (index +1)
  let audio = new Audio()
  audio.volume=0.1
  //audio.src='../assets/audios/click.mp3'
 audio.play()
 })
})

function codeHTML(){
 const html = ["Le narrateur adulte raconte sa solitude depuis l’âge de 6 ans il décrit les locateurs de Dar Chouafa le fquih du msid, il relate sa haine pour le bain maure. Ses véritables amis sont des personnages imaginaire et les objet de la boite à merveilles. Sa mère qui possède un talent de comédienne, s’inspirait des anecdotes dans le bain pour les raconter aux voisins et chez elle. Ce talent gênait le narrateur car la mère dramatisait se disputait.",
     "Le narrateur rentre chez lui après une journée difficile passée au Msid. Sa mère est souffrante d’une migraine. Lalla Aicha son amie, vient lui rendre visite et la convaine de rendre visite à Sidi Boughalab pour sa guérison et celle de Sidi Md. Pendant le voyage, le narrateur se fait griffer par un matou. Ce qui précipite le retour a la maison. Restant à la maison a cause de la fatigue, le narrateur assiste au cérémonial des matinées.",
     "L’auteur narrateur raconte sa journée au Msid et son retour a la maison. Voyant que sa voisine Fatima Bziouiya s’éclairait avec une lampe a pétrole, elle finit par convaincre son mari de lui en acheter une. Lalla Zoubida pleure le malleur de Rahma qui a égaré sa fille Zineb. Ayant retrouvé sa fille,Rahma organise un repas pour les pauvres.",
     "Les premiers jours de printemps, le narrateur et sa mère rendent visite a lalla Aicha.Moulay Larbie entre et entretient sa femme, qui raconte a son tour a lalla zoubida les malheurs de son mari. Le lendemain, Lalla Zoudiba raconte les problèmes de Moulay Larbi avec son associe Abdallah. Sidi Md réfugie dans son imagination, revit le récit de son père sur Abdellah l’épicier.",
     "Un mercredi, le Fquih, clément, explique ses projets pour Achoura. Rentre chez lui, le narrateur attend le retour de sa mère de chez Lalla Aicha qui raconte les malheurs de son amie à Fatima, puis a Rahma leur faisant promettre de garder le secret. Des cris et hurlements annoncent la mort de Sidi Md Ben Tahar. Imaginant le cortège furnèbre du défunt, l’autre se souvient de l’histoire racontée par son père.",
     "Pendant les préparatifs pour Achoura au Msid, le fquih distribue les travaux et forme des équipes. L’auteur est nomme chef des frotteurs et se vante devant des parents des ses multiples exploits. Le matin suivant, il accompagne sa mère à la kissaria ou elle lui achète un gilet. Lalla Zoubida fait encore des courses pour Kenza. De retour chez lui, sidi Md se chamaille avec Zineb. Ce qui énerve sa mère. Triste et tenaille par la faim, l’auteur rêve au jour ou étant prince, il offrirait des repas aux mendiants. On entent Lalla Khadija chante et Rahma raconte l’histoire du couple de Khadija, la jeune épouse avec son vieux mari l’oncle othman.",
     "La veille de achoura, les femmes s’achètent des tambours. Sidi Md a eu trompette. Il participe aux travaux du Msid pour la nuit de achoura. Le lendemain chez le coiffeur, se trouve mal en écoutent si Abderrhaman bavarder avec oncle hammad du mariage de sidi Ahmed avec les filles de si Omar le notaire. Le jour de achoura, le narrateur met ses vêtements neufs et apporte cinq francs et un cierge au Msid. Lalla aicha fais a la famille une visite en surprise",
     "Un lundi, le père du narrateur annonça son intention d’emmener sa femme et son fils au souk des bijoux pour acheter a sa femme des bracelets. Accompagnée de Fatma Bziouya, la famille du narrateur arrive au souk des bijoutiers. Le père qui veut corrige un le courtier malhonnête, se dispute avec lui et disparaît dans la foule. Sa famille rentre en pleure. Superstitieuse, la femme ne veut plus ces bracelets. La mère raconte a lalla Aicha la mésaventure du souk. Sidi Md tombe malade.",
     "Le père annonce à sa femme qu’il a perdu tout son capital. Il annonce la décision de vendre les bracelets et d’aller travailler comme moissonneur aux environ de Fès. Le surlendemain le père part. Sidi Md souffre de fièvre : Sur les conseils de Lalla Aicha, la mère emmène Sidi Md pour rendre visite a Sidi El Arafi.",
     "Après avoir écoute les prédictions de Sidi Al Arafi, il rentrent chez eux en gardant le secret de la visite… Lalla Zoubida annonce a son fils de le garder a la maison et de l’emmener chaque semaine prier sous la coupole d’un saint. Un matin elle reçoit la visite d’un envoyé d  son mari. Lalla Aicha prie son amie de lui rendre visite le lendemain parce qu’elle avait une secret a lui avouer.",
     "Chez Lalla Aicha, les femmes discutent. Elle reçoit la visite de Salama, qui raconte son rôle dans le mariage de M. Larbi avec la fille de coiffeurs et les déboires conjugables du nouveau couple. Zhor arrive et confirme les malheurs de M. Larbi avec sa jeune épouse. Sidi Md met fin à la discussion des femmes en renversant son verre de thé.",
     "Un matin Allal El Yacoubi vient s’enquérir de la santé de sidi Mohammed, Zineb vient annoncer le retour de maâlem Abdeslam. Un peu plus tard, le père rentre chez lui charge de poulets et de diverse provision. Sidi Md raconte a son père mes événement passe pendant son absence. Le père du narrateur apprend par son ami Driss qui vient lui rendre visite, le divorce de M. larbi. Maalem Abdeslam bénit cette séparation. Sidi Md sort sa boite merveille et se laisse empoter par sommeil."]
 return html
}

