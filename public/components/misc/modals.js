import { API_URL } from '../../config/env.js'
import { toast } from './utils.js'
import { safeFetchFormDataWithLoader } from '../../utils/api.js'

export function modalFreeMins(success, message, lottie = 'failed', autoClose) {
    const div = document.createElement('div')
    div.className = "modal-creer-compte"
    div.innerHTML = `<div class="modal-card">
            <div class="modal-titre">
                <h3 class=${success ? 'modal-green' : 'modal-red'}>${success ? 'Félicitaion !' : 'Erreur'}</h3>
                <div class="fermer-modal"><i class="fa-solid fa-circle-xmark"></i></div>                
            </div>
        <div class="modal-corps">           
            <h3>${message}</h3>
            <img src='./assets/img/${lottie}.png' alt="Compte déjà utilisé"/>
        </div>
        <div class="modal-footer">
            <div class="ok">Ok</div>
        </div>
        </div>

    <style>
.modal-creer-compte{
          position: fixed;
          width: 100%; height: 100%;
          top:0; left:0 ;
          background-color: var(--overlay);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1001;
        }
        .modal-card{
            width: 240px;
            box-shadow: 0 0 3px var(--secc);
            background-color: var(--pr);
            border-radius: 10px;
            overflow: hidden;
            opacity:0;
            transition: 0.5s;
            animation: appear linear  .3s forwards;
        }
        @keyframes appear {
            from{opacity: 0}
            to{ opacity: 1;}
        }
        .modal-titre{
            background-color: var(--premium-light);
            padding: 25px 10px ;
            margin: 0;
            position: relative;
        }
        .modal-red{color: var(--error)}
        .modal-green{color:var(--success)}
        .modal-titre h3{
            margin:0
        }
        .modal-titre svg{
            position: absolute;
            right: 5px;
            top: 5px;
            font-size: 25px;
            color: var(--premium-comp);
            cursor: pointer
        }
        .modal-corps{
            position: relative;
            padding: 20px 20px 0 20px;
        }
        .modal-corps img{
            display: block;
            margin: 30px auto;
            height: 120px;
        }
        .modal-footer{
            text-align: center;
            padding: 10px;
            margin: 10px auto;
            text-align: center;
            width: 80px;
            border: 1px solid var(--secc);
            border-radius: 5px;
            cursor: pointer;
        }
        
    </style> `
    document.body.appendChild(div)
    document.body.style.position = 'fixed'

    const closeModal = document.querySelector('.modal-titre .fermer-modal')
    const ok = document.querySelector('.modal-footer div')
    if (autoClose) {
        setTimeout(() => {
            setTimeout(() => {
                div.style.opacity = "0"
            }, 1400)
            document.body.style.position = "static"
            div.remove()
        }, 1500)
    }
    closeModal.addEventListener('click', () => {
        document.body.style.position = "static"
        div.remove()
    })
    ok.addEventListener('click', () => {
        document.body.style.position = "static"
        div.remove()
    })
}

export function modalLokedContent() {
    const div = document.createElement('div')
    div.className = "lock-container"
    div.innerHTML = `<div class="lock">
        <img src="./assets/img/lock.png"/>        
    </div>
    <style>
.lock-container{
            z-index: 33;
            height: 100%; width: 100%;
            position: fixed;
            top:0; left:0;
            bbackground-color: var(--notification);
            display: flex;
            justify-content: center; align-items: center
        }
        .lock img{
            height: 120px;
        }
    </style>`
    document.body.appendChild(div)
    setTimeout(() => { div.remove() }, 800)

}

export function modalDevenirPremium() {
    const div = document.createElement('div')
    div.className = "modal-premium-page"
    div.innerHTML = `
    <div class="modal-premium-overlay">
        <div class="modal-premium-card">
            <div class="modal-premium-header">
                <h2>Devenir PREMIUM</h2>
                <div class="fermer-modal-premium"><i class="fa-solid fa-circle-xmark"></i></div>
            </div>
            <div class="modal-premium-corps">
                <div class="banking-info">
                    <h3>Coordonnées Bancaires</h3>
                    <p>Pour activer votre compte, veuillez effectuer un virement de <strong>50 DH</strong> sur le compte suivant :</p>
                    <div class="rib-container">
                        <strong>RIB : 1234 5678 9012 3456 7890 1234</strong><br>
                        <span>Banque : CIH Bank</span><br>
                        <span>Nom : Euduka Formations</span>
                    </div>
                </div>
                
                <hr>

                <form id="premium-form" class="premium-form">
                    <h3>Envoyer votre reçu</h3>
                    <div class="form-group">
                        <label for="numeroRecu">Numéro du reçu</label>
                        <input type="text" id="numeroRecu" name="numeroRecu" placeholder="Ex: 8876765..." required>
                    </div>
                    <div class="form-group">
                        <label for="recuImage">Image du reçu (Upload)</label>
                        <input type="file" id="recuImage" name="recuImage" accept="image/*" required>
                    </div>
                    <button type="submit" class="btn-envoyer-premium">Valider ma demande</button>
                </form>
            </div>
        </div>
    </div>

    <style>
        .modal-premium-page {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            z-index: 2000;
        }
.modal-premium-overlay {
            width: 100%; height: 100%;
            background: var(--overlay);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .modal-premium-card {
            background: var(--pr);
            width: 90%;
            max-width: 450px;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
.modal-premium-header {
            background: var(--premium-comp);
            color: var(--pr);
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .fermer-modal-premium {
            cursor: pointer;
            font-size: 24px;
        }
        .modal-premium-corps {
            padding: 20px;
            max-height: 80vh;
            overflow-y: auto;
        }
        .banking-info {
            background: var(--secc);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            border-left: 5px solid var(--warning);
        }
        .rib-container {
            margin-top: 10px;
            font-family: monospace;
            background: var(--secc);
            padding: 10px;
            border-radius: 5px;
        }
        .premium-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .form-group input {
            padding: 10px;
            border: 1px solid var(--secc);
            border-radius: 5px;
        }
        .btn-envoyer-premium {
            background: var(--premium-comp);
            color: var(--pr);
            border: none;
            padding: 12px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            font-size: 16px;
        }
        .btn-envoyer-premium:hover {
            background: var(--warning);
        }
        hr {
            margin: 20px 0;
            border: none;
            border-top: 1px solid #eee;
        }
    </style>
    `
    document.body.appendChild(div)
    document.body.style.overflow = "hidden"

    const closeBtn = div.querySelector('.fermer-modal-premium')
    closeBtn.onclick = () => {
        div.remove()
        document.body.style.overflow = "auto"
    }

    const form = div.querySelector('#premium-form')
    form.onsubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        if (!token) {
            toast("Veuillez vous connecter pour envoyer votre demande.")
            return
        }

        const submitBtn = div.querySelector('.btn-envoyer-premium')
        const originalText = submitBtn.innerText
        submitBtn.disabled = true
        submitBtn.innerText = "Envoi en cours..."

        const formData = new FormData(form)

        try {
            const result = await safeFetchFormDataWithLoader(API_URL + '/demande-premium', formData, token)

            if (result.status === 401) {
                toast("Session expirée. Veuillez vous reconnecter.")
                submitBtn.disabled = false
                submitBtn.innerText = originalText
                return
            }

            if (result.success) {
                toast(result.data.message)
                div.remove()
                document.body.style.overflow = "auto"
            } else {
                toast(result.error || "Une erreur est survenue")
                submitBtn.disabled = false
                submitBtn.innerText = originalText
            }
        } catch (error) {
            console.error(error)
            toast("Erreur de connexion au serveur")
            submitBtn.disabled = false
            submitBtn.innerText = originalText
        }
    }
}
