import { creerCompte, toast } from './utils.js';
import { validateLoginForm, sanitizeInput } from '../../utils/validation.js';
import { safeFetchPost, safeFetchPostWithLoader } from '../../utils/api.js';
import { API_URL } from '../../config/env.js';

export function login() {
  const div = document.createElement('div');
  div.className = 'login-overlay';
  div.innerHTML = `
    <div class="login-modal">
      <button class="login-close-btn"><i class="fas fa-times"></i></button>
      <div class="login-header">
        <div class="login-logo">
          <img src="/client/assets/img/euduka.png" alt="EUDUKA" />
        </div>
        <h1 class="login-title">Bon retour !</h1>
        <p class="login-subtitle">Connectez-vous pour continuer</p>
      </div>
      <form class="login-form">
        <div class="input-group">
          <span class="input-icon"><i class="fas fa-envelope"></i></span>
          <input type="email" class="input-email" placeholder="Adresse email" required>
        </div>
        <div class="input-group">
          <span class="input-icon"><i class="fas fa-lock"></i></span>
          <input type="password" class="input-pass" placeholder="Mot de passe" required>
          <button type="button" class="toggle-pass"><i class="fas fa-eye"></i></button>
        </div>
        <button type="submit" class="btn-login">
          <span>Se connecter</span>
          <i class="fas fa-arrow-right"></i>
        </button>
        <button type="button" class="btn-annuler">Annuler</button>
      </form>
      <div class="login-footer">
        <p class="redirect-text">Vous n'avez pas de compte ? <span class="creer-compte-link">Créer un compte</span></p>
        <p class="mdp-link"><span class="mdp-oublie-link">Mot de passe oublié ?</span></p>
      </div>
    </div>
    <style>
      .login-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, rgba(var(--comp), 0.1), rgba(var(--premium-comp), 0.1));
        backdrop-filter: blur(8px);
        z-index: 1000;
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .login-modal {
        position: relative;
        width: 90%;
        max-width: 420px;
        background: var(--pr);
        border-radius: 24px;
        padding: 40px 32px;
        box-shadow: 0 25px 50px -12px rgba(var(--comp), 0.25);
        animation: slideUp 0.4s ease-out;
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

      .login-close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 36px;
        height: 36px;
        border: none;
        background: var(--secc);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        color: var(--text-light);
      }

      .login-close-btn:hover {
        background: var(--comp);
        color: var(--pr);
        transform: rotate(90deg);
      }

      .login-header {
        text-align: center;
        margin-bottom: 32px;
      }

      .login-logo img {
        width: 60px;
        height: auto;
        margin-bottom: 16px;
      }

      .login-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--secf);
        margin-bottom: 8px;
      }

      .login-subtitle {
        color: var(--sec);
        font-size: 0.95rem;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .input-group {
        position: relative;
        display: flex;
        align-items: center;
      }

      .input-icon {
        position: absolute;
        left: 16px;
        color: var(--sec);
        font-size: 1rem;
        transition: color 0.2s ease;
      }

      .input-group input {
        width: 100%;
        padding: 14px 16px 14px 48px;
        border: 2px solid var(--secc);
        border-radius: 12px;
        font-size: 1rem;
        transition: all 0.2s ease;
        background: var(--pr);
      }

      .input-group input:focus {
        outline: none;
        border-color: var(--comp);
        background: var(--pr);
        box-shadow: 0 0 0 4px rgba(var(--comp), 0.1);
      }

      .input-group input:focus + .input-icon,
      .input-group input:focus ~ .input-icon {
        color: var(--comp);
      }

      .toggle-pass {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--sec);
        padding: 4px;
        transition: color 0.2s ease;
      }

      .toggle-pass:hover {
        color: var(--comp);
      }

      .btn-login {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px 24px;
        background: linear-gradient(135deg, var(--comp), var(--comp));
        color: var(--pr);
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 8px;
      }

      .btn-login:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(var(--comp), 0.4);
      }

      .btn-login:active {
        transform: translateY(0);
      }

      .btn-annuler {
        padding: 12px 24px;
        background: var(--secc);
        color: var(--sec);
        border: 2px solid var(--secc);
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .btn-annuler:hover {
        background: var(--secc);
        border-color: var(--sec);
      }

      .login-footer {
        text-align: center;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid var(--secc);
      }

      .redirect-text, .mdp-link {
        font-size: 0.9rem;
        color: var(--sec);
        margin-bottom: 8px;
      }

      .creer-compte-link, .mdp-oublie-link {
        color: var(--comp);
        font-weight: 600;
        cursor: pointer;
        transition: color 0.2s ease;
        position: relative;
      }

      .creer-compte-link:hover, .mdp-oublie-link:hover {
        color: var(--comp);
      }

      .creer-compte-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--comp);
        transition: width 0.3s ease;
      }

      .creer-compte-link:hover::after {
        width: 100%;
      }
    </style>
  </form>`;

  document.body.appendChild(div);

  const btnLogin = div.querySelector('.btn-login');
  btnLogin.onclick = function (e) {
    submitLogin(e, div);
  };

  const btnAnnuler = div.querySelector('.btn-annuler');
  btnAnnuler.onclick = function () {
    closeModal(div);
  };

  const btnClose = div.querySelector('.login-close-btn');
  btnClose.onclick = function () {
    closeModal(div);
  };

  const creerCompteLink = div.querySelector('.creer-compte-link');
  creerCompteLink.onclick = function () {
    closeModal(div);
    creerCompte();
  };

  const mdpOublieLink = div.querySelector('.mdp-oublie-link');
  mdpOublieLink.onclick = function () {
    closeModal(div);
    mpdOublie(document.body);
  };

  const togglePass = div.querySelector('.toggle-pass');
  const passInput = div.querySelector('.input-pass');
  togglePass.onclick = function () {
    const type = passInput.type === 'password' ? 'text' : 'password';
    passInput.type = type;
    togglePass.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
  };

  async function submitLogin(e, div) {
    e.preventDefault();
    const email = div.querySelector('.input-email').value;
    const password = div.querySelector('.input-pass').value;

    const validation = validateLoginForm({ email, password })
    if (!validation.valid) {
      const errorMsg = Object.values(validation.errors).join('\n')
      toast(errorMsg)
      return
    }

    const cleanData = {
      email: sanitizeInput(email, 254),
      password: password
    }

    const result = await safeFetchPost(API_URL + '/login', cleanData)

    if (result.success && result.data?.eleve) {
      localStorage.setItem('role', result.data.eleve.role)
      localStorage.setItem('token', result.data.eleve.token)
      const { _id, nom, prenom, email, tel, freeMins, resultats, role } = result.data.eleve
      const objElv = { _id, nom, prenom, email, tel, freeMins, resultats, role }
      localStorage.setItem('profile', JSON.stringify(objElv))
      toast("Connecté avec succès")
      setTimeout(() => window.location.reload(), 800)
    } else {
      const errorMsg = result.error || result.message || 'Erreur de connexion'
      toast(errorMsg)
    }
  }

  function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.2s ease-out forwards';
    setTimeout(() => modal.remove(), 200);
  }
}

export function mpdOublie(parent) {
  const modalMdp = document.createElement('div');
  modalMdp.className = 'mdp-overlay';
  modalMdp.innerHTML = `
    <div class="mdp-modal">
      <button class="mdp-close-btn"><i class="fas fa-times"></i></button>
      <div class="mdp-header">
        <div class="mdp-icon"><i class="fas fa-key"></i></div>
        <h2 class="mdp-title">Mot de passe oublié</h2>
        <p class="mdp-subtitle">Un email vous sera envoyé pour réinitialiser votre mot de passe</p>
      </div>
      <div class="mdp-form">
        <div class="input-group">
          <span class="input-icon"><i class="fas fa-envelope"></i></span>
          <input type="email" class="mdp-email" placeholder="Entrez votre email" required>
        </div>
        <button class="mdp-confirmer">
          <span>Envoyer</span>
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
    <style>
      .mdp-overlay {
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
        z-index: 1001;
        animation: fadeIn 0.3s ease-out;
      }

      .mdp-modal {
        position: relative;
        width: 90%;
        max-width: 420px;
        background: white;
        border-radius: 24px;
        padding: 40px 32px;
        box-shadow: 0 25px 50px -12px rgba(232, 147, 50, 0.25);
        animation: slideUp 0.4s ease-out;
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

      .mdp-close-btn {
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
      }

      .mdp-close-btn:hover {
        background: #e89332;
        color: white;
        transform: rotate(90deg);
      }

      .mdp-header {
        text-align: center;
        margin-bottom: 32px;
      }

      .mdp-icon {
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #e89332, #d48220);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        color: white;
        font-size: 1.5rem;
      }

      .mdp-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #2c2c2c;
        margin-bottom: 8px;
      }

      .mdp-subtitle {
        color: #6f6f6f;
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .mdp-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
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
      }

      .mdp-email {
        width: 100%;
        padding: 14px 16px 14px 48px;
        border: 2px solid #e8e8e8;
        border-radius: 12px;
        font-size: 1rem;
        transition: all 0.2s ease;
        background: #fafafa;
      }

      .mdp-email:focus {
        outline: none;
        border-color: #e89332;
        background: white;
        box-shadow: 0 0 0 4px rgba(232, 147, 50, 0.1);
      }

      .mdp-confirmer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px 24px;
        background: linear-gradient(135deg, #e89332, #d48220);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .mdp-confirmer:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(232, 147, 50, 0.4);
      }
    </style>`;

  parent.appendChild(modalMdp);

  const mdpCloseBtn = modalMdp.querySelector('.mdp-close-btn');
  const mdpConfirmer = modalMdp.querySelector('.mdp-confirmer');

  mdpCloseBtn.addEventListener('click', () => {
    modalMdp.style.animation = 'fadeOut 0.2s ease-out forwards';
    setTimeout(() => modalMdp.remove(), 200);
  });

  mdpConfirmer.addEventListener('click', async () => {
    const mdpOublieEmail = modalMdp.querySelector('.mdp-email').value;
    try {
      const result = await safeFetchPostWithLoader(API_URL + '/mdp-oublie', { email: mdpOublieEmail });
      if (result.success) {
        toast(result.data.message);
        setTimeout(() => {
          modalMdp.style.animation = 'fadeOut 0.2s ease-out forwards';
          setTimeout(() => modalMdp.remove(), 200);
        }, 1000);
      } else {
        toast(result.error);
      }
    } catch (error) {
      toast(error.message);
    }
  });
}

export function adminLogin() {
  const targetUrl = '/client/euduka/admin';

  let overlay = document.getElementById('admin-login-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'admin-login-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      zIndex: '10000',
      overflowY: 'auto',
      display: 'block'
    });
    document.body.appendChild(overlay);
  }

  const render = async (html) => {
    overlay.innerHTML = html;

    const btnLogin = overlay.querySelector('.btn-login');
    if (btnLogin) {
      btnLogin.onclick = async (e) => {
        e.preventDefault();
        const emailInput = overlay.querySelector('input[name="email"]');
        const passwordInput = overlay.querySelector('input[name="password"]');

        if (!emailInput || !passwordInput) return;

        const data = {
          email: emailInput.value,
          password: passwordInput.value
        };

        try {
          const res = await fetch(API_URL + targetUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'text/html'
            },
            body: JSON.stringify(data)
          });
          const nextHtml = await res.text();
          render(nextHtml);
        } catch (err) {
          console.error('[AdminLogin] Submit Error:', err);
          toast('Erreur de connexion');
        }
      };
    }

    const closeButtons = overlay.querySelectorAll('.btn-annuler', '.logout-btn');
    closeButtons.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        overlay.remove();
      };
    });

    overlay.querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  };

  fetch(API_URL + targetUrl)
    .then(res => res.text())
    .then(render)
    .catch(err => {
      console.error('[AdminLogin] Load Error:', err);
      toast('Erreur de chargement');
    });
}
