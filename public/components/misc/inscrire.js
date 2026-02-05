export function inscrire() {
  const html = `
    <div class="inscrire-overlay">
      <div class="inscrire-modal">
        <button class="inscrire-close-btn"><i class="fas fa-times"></i></button>
        <div class="inscrire-header">
          <div class="inscrire-logo">
            <img src="/client/assets/img/euduka.png" alt="EUDUKA" />
          </div>
          <h1 class="inscrire-title">Créer un compte</h1>
          <p class="inscrire-subtitle">Rejoignez Euduka pour réussir votre Bac</p>
        </div>
        <form class="inscrire-form">
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-user"></i></span>
            <input type="text" id="nom" placeholder="Nom complet" required>
          </div>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-envelope"></i></span>
            <input type="email" id="email" placeholder="Adresse email" required>
          </div>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-phone"></i></span>
            <input type="tel" id="tel" placeholder="Numéro de téléphone" required>
          </div>
          <div class="input-group">
            <span class="input-icon"><i class="fas fa-lock"></i></span>
            <input type="password" id="pw" placeholder="Mot de passe" required>
            <button type="button" class="toggle-pass"><i class="fas fa-eye"></i></button>
          </div>
          <div class="avatars-section">
            <span class="avatars-label">Choisir un avatar</span>
            <div class="avatars-container">
              <div class="avatar-option" data-avatar="1">😊</div>
              <div class="avatar-option" data-avatar="2">😎</div>
              <div class="avatar-option" data-avatar="3">🤓</div>
              <div class="avatar-option" data-avatar="4">🥰</div>
              <div class="avatar-option" data-avatar="5">😌</div>
              <div class="avatar-option" data-avatar="6">🤩</div>
            </div>
          </div>
          <button type="submit" class="btn-creer">
            <span>Créer mon compte</span>
            <i class="fas fa-check"></i>
          </button>
        </form>
        <div class="inscrire-footer">
          <p class="redirect-text">Vous avez déjà un compte ? <span class="connecter-link">Se connecter</span></p>
        </div>
      </div>
    </div>
    <style>
      .inscrire-overlay {
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

      .inscrire-modal {
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

      .inscrire-close-btn {
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

      .inscrire-close-btn:hover {
        background: #e89332;
        color: white;
        transform: rotate(90deg);
      }

      .inscrire-header {
        text-align: center;
        margin-bottom: 28px;
      }

      .inscrire-logo img {
        width: 60px;
        height: auto;
        margin-bottom: 16px;
      }

      .inscrire-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #2c2c2c;
        margin-bottom: 8px;
      }

      .inscrire-subtitle {
        color: #6f6f6f;
        font-size: 0.95rem;
      }

      .inscrire-form {
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
        border-color: #e89332;
        background: white;
        box-shadow: 0 0 0 4px rgba(232, 147, 50, 0.1);
      }

      .input-group input:focus + .input-icon,
      .input-group input:focus ~ .input-icon {
        color: #e89332;
      }

      .toggle-pass {
        position: absolute;
        right: 12px;
        background: none;
        border: none;
        cursor: pointer;
        color: #6f6f6f;
        padding: 4px;
        transition: color 0.2s ease;
      }

      .toggle-pass:hover {
        color: #e89332;
      }

      .avatars-section {
        margin: 8px 0;
      }

      .avatars-label {
        display: block;
        font-size: 0.9rem;
        color: #6f6f6f;
        margin-bottom: 12px;
        text-align: center;
      }

      .avatars-container {
        display: flex;
        justify-content: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .avatar-option {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        background: #f5f5f5;
        border: 2px solid transparent;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .avatar-option:hover {
        transform: scale(1.1);
        background: #fff5e6;
      }

      .avatar-option.selected {
        border-color: #e89332;
        background: #fff5e6;
        box-shadow: 0 0 0 3px rgba(232, 147, 50, 0.2);
      }

      .btn-creer {
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
        margin-top: 8px;
      }

      .btn-creer:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(232, 147, 50, 0.4);
      }

      .inscrire-footer {
        text-align: center;
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid #f0f0f0;
      }

      .redirect-text {
        font-size: 0.9rem;
        color: #6f6f6f;
      }

      .connecter-link {
        color: #e89332;
        font-weight: 600;
        cursor: pointer;
        transition: color 0.2s ease;
        position: relative;
      }

      .connecter-link:hover {
        color: #d48220;
      }

      .connecter-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: #e89332;
        transition: width 0.3s ease;
      }

      .connecter-link:hover::after {
        width: 100%;
      }
    </style>
  </div>`;

  const insc = document.createElement('div');
  insc.innerHTML = html;
  insc.classList.add('inscrire');
  document.body.appendChild(insc);

  let selectedAvatar = 1;

  const closeBtn = insc.querySelector('.inscrire-close-btn');
  closeBtn.onclick = () => {
    insc.style.animation = 'fadeOut 0.2s ease-out forwards';
    setTimeout(() => insc.remove(), 200);
  };

  const avatarOptions = insc.querySelectorAll('.avatar-option');
  avatarOptions.forEach(avatar => {
    avatar.onclick = () => {
      avatarOptions.forEach(a => a.classList.remove('selected'));
      avatar.classList.add('selected');
      selectedAvatar = avatar.dataset.avatar;
    };
  });

  avatarOptions[0].classList.add('selected');

  const togglePass = insc.querySelector('.toggle-pass');
  const passInput = insc.querySelector('#pw');
  if (togglePass && passInput) {
    togglePass.onclick = () => {
      const type = passInput.type === 'password' ? 'text' : 'password';
      passInput.type = type;
      togglePass.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    };
  }

  const connecterLink = insc.querySelector('.connecter-link');
  if (connecterLink) {
    connecterLink.onclick = () => {
      insc.style.animation = 'fadeOut 0.2s ease-out forwards';
      setTimeout(() => {
        insc.remove();
        const { login } = require('./login.js');
        login();
      }, 200);
    };
  }

  const form = insc.querySelector('.inscrire-form');
  form.onsubmit = (e) => {
    e.preventDefault();
  };
}
