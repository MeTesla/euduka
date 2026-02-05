// Afficher une notification simple
import { profile } from './profile.js'
import { modalDevenirPremium, modalFreeMins } from './modals.js'
import { login } from './login.js'
import { API_URL } from '../../config/env.js'
import { getProfile, setProfile, getResults } from '../../utils/storage.js'
import { safeFetchPost, safeFetchGet, safeFetchPostWithLoader } from '../../utils/api.js'
import { validateSignupForm, sanitizeInput } from '../../utils/validation.js'

export function creerCompte() {
  const modal = document.createElement('div')
  modal.className = "creer-compte-overlay"
  modal.innerHTML = `
    <div class="creer-compte-modal">
      <button class="creer-compte-close-btn"><i class="fas fa-times"></i></button>
      <div class="creer-compte-header">
        <div class="creer-compte-logo">
          <img src="/client/assets/img/euduka.png" alt="EUDUKA" />
        </div>
        <h1 class="creer-compte-title">Créer un compte</h1>
        <p class="creer-compte-subtitle">Rejoignez Euduka pour réussir votre Bac</p>
      </div>
      <form class="creer-compte-form">
        <div class="input-group">
          <span class="input-icon"><i class="fas fa-user"></i></span>
          <input type="text" class="nom" required placeholder="Nom" name="nom">
        </div>
        <div class="input-group">
          <span class="input-icon"><i class="fas fa-user"></i></span>
          <input type="text" class="prenom" required placeholder="Prénom" name="prenom">
        </div>
        <div class="input-group">
          <span class="input-icon"><i class="fas fa-envelope"></i></span>
          <input type="email" class="email" required placeholder="Adresse email" name="email" id="em">
        </div>
        <div class="input-group">
          <span class="input-icon"><i class="fas fa-phone"></i></span>
          <input type="tel" class="tel" required placeholder="Numéro de téléphone" name="tel">
        </div>
        <div class="input-group">
          <span class="input-icon"><i class="fas fa-lock"></i></span>
          <input type="password" class="password" required placeholder="Mot de passe" name="password">
        </div>
        <div class="input-group">
          <span class="input-icon"><i class="fas fa-lock"></i></span>
          <input type="password" class="confirmPassword" required placeholder="Confirmer le mot de passe" name="confirmPassword">
        </div>
        <div class="creer-buttons">
          <button class="envoyer" type="submit">
            <span>Créer mon compte</span>
            <i class="fas fa-check"></i>
          </button>
          <button class="annuler" type="button">Annuler</button>
        </div>
      </form>
      <div class="creer-compte-footer">
        <p class="redirect-text">Vous avez déjà un compte ? <span class="login-link">Se connecter</span></p>
      </div>
    </div>
    <style>
      .creer-compte-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, rgba(232, 147, 50, 0.1), rgba(126, 87, 194, 0.1));
        backdrop-filter: blur(8px);
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }

      .creer-compte-modal {
        position: relative;
        width: 90%;
        max-width: 460px;
        background: white;
        border-radius: 24px;
        padding: 40px 32px;
        box-shadow: 0 25px 50px -12px rgba(232, 147, 50, 0.25);
        animation: slideUp 0.4s ease-out;
        max-height: 90vh;
        overflow-y: auto;
      }

      .creer-compte-close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 36px;
        height: 36px;
        border: none;
        background: #f5f5f5;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        color: #666;
        z-index: 10;
      }

      .creer-compte-close-btn:hover {
        background: var(--premium-comp);
        color: white;
        transform: rotate(90deg);
      }

      .creer-compte-header {
        text-align: center;
        margin-bottom: 28px;
      }

      .creer-compte-logo img {
        width: 60px;
        height: auto;
        margin-bottom: 16px;
      }

      .creer-compte-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #2c2c2c;
        margin-bottom: 8px;
      }

      .creer-compte-subtitle {
        color: #6f6f6f;
        font-size: 0.95rem;
      }

      .creer-compte-form {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .input-group {
        position: relative;
        display: flex;
        align-items: center;
      }

      .input-group .input-icon {
        position: absolute;
        left: 16px;
        color: #6f6f6f;
        font-size: 1rem;
        transition: color 0.2s ease;
      }

      .input-group input {
        width: 100%;
        padding: 14px 16px 14px 48px;
        border: 2px solid #e8e8e8;
        border-radius: 12px;
        font-size: 1rem;
        transition: all 0.2s ease;
        background: #fafafa;
      }

      .input-group input:focus {
        outline: none;
        border-color: var(--premium-comp);
        background: white;
        box-shadow: 0 0 0 4px rgba(232, 147, 50, 0.1);
      }

      .input-group input:focus + .input-icon,
      .input-group input:focus ~ .input-icon {
        color: #e89332;
      }

      .creer-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 8px;
      }

      .envoyer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px 24px;
        background: var(--premium-comp);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .envoyer:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(232, 147, 50, 0.4);
      }

      .annuler {
        padding: 12px 24px;
        background: #f5f5f5;
        color: #6f6f6f;
        border: 2px solid #e8e8e8;
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .annuler:hover {
        background: #eeeeee;
        border-color: #ddd;
      }

      .creer-compte-footer {
        text-align: center;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #f0f0f0;
      }

      .redirect-text {
        font-size: 0.9rem;
        color: #6f6f6f;
      }

      .login-link {
        color: #e89332;
        font-weight: 600;
        cursor: pointer;
        transition: color 0.2s ease;
        position: relative;
      }

      .login-link:hover {
        color: #d48220;
      }

      .login-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: #e89332;
        transition: width 0.3s ease;
      }

      .login-link:hover::after {
        width: 100%;
      }
    </style>
  </div>`
  document.body.appendChild(modal)

  const closeBtn = modal.querySelector('.creer-compte-close-btn')
  closeBtn.onclick = function () {
    modal.style.animation = 'fadeOut 0.2s ease-out forwards';
    setTimeout(() => modal.remove(), 200);
  }

  const annuler = modal.querySelector('.annuler')
  annuler.onclick = function () {
    modal.style.animation = 'fadeOut 0.2s ease-out forwards';
    setTimeout(() => modal.remove(), 200);
  }

  const form = modal.querySelector('.creer-compte-form')
  const envoyerBtn = modal.querySelector('.envoyer')

  form.onsubmit = function (e) {
    e.preventDefault()
    submitCreerCompte(modal)
  }

  envoyerBtn.onclick = function (e) {
    e.preventDefault()
    submitCreerCompte(modal)
  }

  const loginLink = modal.querySelector('.login-link')
  loginLink.onclick = function () {
    modal.style.animation = 'fadeOut 0.2s ease-out forwards';
    setTimeout(() => {
      modal.remove()
      login()
    }, 200);
  }
}

async function submitCreerCompte(modal) {


  const nom = modal.querySelector('.nom').value
  const prenom = modal.querySelector('.prenom').value
  const email = modal.querySelector('.email').value
  const tel = modal.querySelector('.tel').value
  const password = modal.querySelector('.password').value
  const confirmPassword = modal.querySelector('.confirmPassword').value

  if (password !== confirmPassword) {
    modalFreeMins(false, 'Les mots de passe ne correspondent pas', 'failed')
    return
  }

  if (password.length < 4) {
    modalFreeMins(false, 'Le mot de passe doit contenir au moins 4 caractères', 'failed')
    return
  }

  // 1️⃣ Valider formulaire
  const validation = validateSignupForm({ nom, prenom, email, tel })
  if (!validation.valid) {
    const errorMsg = Object.values(validation.errors).join('\n')
    modalFreeMins(false, errorMsg, 'failed')
    return
  }

  // 2️⃣ Nettoyer inputs
  const cleanData = {
    nom: sanitizeInput(nom, 50),
    prenom: sanitizeInput(prenom, 50),
    email: sanitizeInput(email, 254),
    tel: sanitizeInput(tel, 20),
    password: password,
    confirmPassword: confirmPassword
  }

  // 3️⃣ Envoyer données validées
  const result = await safeFetchPost(API_URL + '/creer-compte', cleanData)

  if (result.success) {
    const data = result.data
    localStorage.setItem('role', data.role)
    localStorage.setItem('token', data.token)
    document.querySelector('.user-menu').remove()
    generateMenu(data.role, document.querySelector('.menu'), document.querySelector('.menu'))
    modal.remove()
    modalFreeMins(true, data.message, 'verifyEmail')
  } else {
    modalFreeMins(false, result.error || 'Erreur lors de la création du compte', 'failed')
  }
}

export async function annulerCompte() {
  console.log('Heloi');

  const token = localStorage.getItem('token')
  if (!token) {
    localStorage.clear()
    toast('Aucun compte trouvé !')
    setTimeout(() => location.reload(), 1000)
  }
  const result = await safeFetchPostWithLoader(API_URL + '/annuler-compte', { token })
  if (result.success) {
    localStorage.clear()
    toast(result.data.message)
    setTimeout(() => { document.location.reload() }, 1000)
  }
  else {
    toast(result.error)
  }
}

// ------------  Get free MINs -----------
async function freeMins() {
  const token = localStorage.getItem('token') || ""
  const result = await safeFetchPostWithLoader(API_URL + '/freeMins', {}, token)
  const data = result.data
  if (data.token) {
    localStorage.setItem('token', data.token)
    console.log(data);

    const { nom, prenom, email, tel, freeMins, resultats, role } = data.eleveUpdated
    const objElv = { nom, prenom, email, tel, freeMins, resultats, role }
    localStorage.setItem('profile', JSON.stringify(objElv))

    modalFreeMins(data.success, data.message, 'winner')
  } else {
    modalFreeMins(data.success, data.message)
  }
}

// ------------- Générer le menu utilisateur --------------
export function generateMenu(typeAccount, pere, menu) {
  const div = document.createElement('div')
  div.className = "user-menu"
  switch (typeAccount) {
    case 'non_verifie':
      div.innerHTML = `<div>
        <div>
          <img src="/client/assets/img/verifyEmail.png" />
          <span>En attente</span>
        </div>
        <div class="annuler">
          <img src="/client/assets/img/annuler.png" />
          <span>Annuler</span>
        </div>
        </div>`
      break;
    case 'basic':
      div.innerHTML = `<div class="basic">
            <div class="premium">
              <img src="/client/assets/img/diamond.png" />
              <span>Premium</span>
            </div>           
            <div class="free-mins">
              <img src="/client/assets/img/freeMins.png" />
              <span>+10 minutes</span>
            </div>  
            <div class="menu-profile">
              <img src="/client/assets/img/profile.png" />
              <span>Profile</span>
            </div>
            <div class="menu-logout">
              <img src="/client/assets/img/logout.png" />
              <span class="logout">Se déconnecter</span>
            </div>
          </div>`
      break;
    case 'attente_premium':
      div.innerHTML = `<div class="attente-premium-menu">
            <div class="status-badge">
              <img src="/client/assets/img/clock.png" />
              <span>En attente Premium</span>
            </div>
            <div class="free-mins">
              <img src="/client/assets/img/freeMins.png" />
              <span>+10 minutes</span>
            </div>
            <div class="menu-profile">
              <img src="/client/assets/img/profile.png" />
              <span>Profile</span>
            </div>
            <div class="menu-logout">
              <img src="/client/assets/img/logout.png" />
              <span class="logout">Se déconnecter</span>
            </div>
          </div>
          <style>
            .attente-premium-menu {
              background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);
              border: 1px solid #ffa500;
              border-radius: 10px;
            }
            .status-badge {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 12px;
              background: #ffa500;
              color: #333;
              font-weight: bold;
              font-size: 0.75rem;
              letter-spacing: 0.5px;
              border-radius: 10px 10px 0 0;
            }
            .status-badge img {
              wwidth: 20px !important;
            }
          </style>`
      break;
    case 'premium':
      div.innerHTML = `
          <div class="premium-active">
            <div class="premium-badge">
              <img src="/client/assets/img/diamond.png" />
              <span>COMPTE PREMIUM 👑</span>
            </div> 
            <div class="menu-profile">
              <img src="/client/assets/img/profile.png" />
              <span>Profile</span>
            </div>
            <div class="menu-logout">
              <img src="/client/assets/img/logout.png" />
              <span class="logout">Se déconnecter</span>
            </div>
          </div>
          <style>
            .premium-active {
              background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);
              border: 1px solid #ffd700;
              border-radius: 10px;
            }
            .premium-badge {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 12px;
              background: #ffd700;
              color: #333;
              font-weight: bold;
              font-size: 0.75rem;
              letter-spacing: 0.5px;
            }
            .premium-badge img {
              width: 20px !important;
              filter: drop-shadow(0 0 2px rgba(0,0,0,0.2));
            }
          </style>`
      break;
    default: 'guest'
      div.innerHTML = `
        <div class="menu-compte">
          <div class="creer-compte">
            <img src="/client/assets/img/creerCompte.png" />
            <span>Créer un compte</span>
          </div>
          <div class="login">
            <img src="/client/assets/img/login.png" />
            <span>Login</span>          
          </div>
        </div>`
      break;
  }

  pere.appendChild(div)
  const userMenu = document.querySelector('.nav .menu .user-menu')

  const compte = document.querySelector('.menu .creer-compte')
  const loginBtn = document.querySelector('.menu .login')
  const menuProfile = document.querySelector('.menu-profile')
  const freeM = document.querySelector('.free-mins')
  const premium = document.querySelector('.premium')
  const logout = document.querySelector('.logout')

  freeM && freeM.addEventListener('click', () => {
    freeMins()
  })

  menuProfile?.addEventListener('click', () => {
    profile()

  })
  compte && compte.addEventListener('click', () => {
    creerCompte()
  })
  loginBtn && loginBtn.addEventListener('click', () => {
    login()
  })
  premium && premium.addEventListener('click', () => {
    // modalDevenirPremium()
    location.assign('./premium.html')
  })

  logout && logout.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
  })

  const annuler = document.querySelector('.annuler')
  annuler && annuler.addEventListener('click', async () => {
    await annulerCompte()
  })

  // show hide menu + Type menus
  menu.addEventListener('click', (e) => {
    e.stopPropagation()
    userMenu.classList.toggle('show')
  })
  document.body.onclick = () => userMenu.classList.contains('show') && userMenu.classList.remove('show')
  document.body.onscroll = () => (userMenu.classList.contains('show')) && userMenu.classList.remove('show')

  return div
}

// ---- LocalStorage resultats
export function handleResultats(resultat) {
  let profile = getProfile()
  if (!profile) {
    console.error('❌ Profile not found when updating results')
    return
  }

  // Ensure resultats object exists
  if (!profile.resultats) {
    profile.resultats = {}
  }

  let resultatLS = profile.resultats
  resultatLS = { ...resultatLS, ...resultat }
  setProfile({ ...profile, resultats: resultatLS })
}

// Slice scores to keep only last 6 items
export function sliceScores(scores) {
  if (scores.length >= 6) {
    return scores.slice(-5)  // Keep 5 to add new one = 6 total
  } else {
    return scores
  }
}

//---Fetch save résultats to DB
export async function fetchResultats(listBlc, isModified) {
  if (isModified) {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('❌ Token missing - cannot sync results')
      listBlc.remove()
      return
    }

    const res = getResults()
    if (!res) {
      console.error('❌ No results found to sync')
      listBlc.remove()
      return
    }

    try {
      const result = await safeFetchPostWithLoader(API_URL + '/update-resultats', { res }, token)
      if (result.success) {
        console.log('✅ Results synced successfully')
        toast('Résultats synchronisés')
        setTimeout(() => {
          listBlc.remove()
        }, 500)
      } else {
        console.error('❌ Sync failed:', result.error)
        toast('Erreur: ' + (result.error || 'Échec de synchronisation'))
        listBlc.remove()
      }
    } catch (error) {
      console.error('❌ Erreur lors de la synchronisation des résultats :', error);
      toast('Erreur de synchronisation des résultats')
      listBlc.remove()
    }
  } else {
    listBlc.remove()
  }
}

// ----Confetti
export function confet() {
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
  });
}

// ---- Toast
export function toast(msg) {
  Toastify({
    gravity: 'bottom',
    text: msg,
    className: "toast-id",
    position: "center",
    close: true
  }).showToast();
}

// Chart.js
export function createLineChart(dataArray, div) {
  // Vérification du tableau
  if (!Array.isArray(dataArray)) {
    console.error('Erreur d\'affichage du graphique');
    return null;
  }

  // Création du canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'myLineChart';
  //canvas.width = 300
  div.appendChild(canvas);

  // Configuration du graphique
  const ctx = canvas.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['N 1', 'N 2', 'N 3', 'N 4', 'N 5', 'N 6', 'N 7', 'N 8'],
      datasets: [{
        label: 'Mes notes',
        data: dataArray,
        borderColor: 'rgba(109, 109, 109, 1)',
        tension: 0.3,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        pointBackgroundColor: 'lightblue',
        pointRadius: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: false,
          text: 'Graphique de mes résultats'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Notes'
          }
        },
        x: {
          display: false,
        }
      }
    }
  });

  return chart;
}

