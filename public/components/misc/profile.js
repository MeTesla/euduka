import { qcm } from "../act/qcm.js"
import { vf } from "../act/vf.js"
import { conic } from "../../utils.js"
import { remplirVide } from "../act/remplirVide.js"
import { ordrePhrases } from "../act/ordrePhrases.js"
import { getProfile } from "../../utils/storage.js"

export function profile() {
    const profileData = getProfile()
    if (!profileData) {
        console.error('❌ Profile data not found in localStorage')
        return
    }
    const { nom, prenom, email, freeMins } = profileData
    const { role } = profileData
    const resultats = profileData.resultats || {}
    
    const div = document.createElement('div')
    div.className = "profile-overlay"
    div.innerHTML = `
        <div class="profile-modal">
            <div class="profile-header">
                <div class="profile-logo">
                    <img src="/client/assets/img/euduka.png" alt="EUDUKA" />
                </div>
                <div class="profile-header-right">
                    <div class="profile-date"></div>
                    <button class="profile-close-btn"><i class="fas fa-times"></i></button>
                </div>
            </div>
            
            <div class="profile-content">
                <div class="user-info-card">
                    <div class="user-avatar">
                        <img src="/client/assets/img/user-img.png" alt="${nom}" />
                    </div>
                    <h2 class="user-name">${nom} ${prenom}</h2>
                    <div class="user-status ${role === 'premium' ? 'status-premium' : role === 'attente_premium' ? 'status-waiting' : ''}">
                        ${getStatusBadge(role)}
                    </div>
                    <p class="user-email"><i class="fas fa-envelope"></i> ${email}</p>
                    <div class="user-minutes">
                        ${getMinutesDisplay(role, freeMins)}
                    </div>
                </div>
                
                <div class="results-section">
                    <h3 class="section-title"><i class="fas fa-chart-line"></i> Mes résultats</h3>
                    
                    <div class="results-grid">
                        ${createResultCard('QCM', 'qcm', resultats.qcm)}
                        ${createResultCard('Vrai/Faux', 'vf', resultats.vf)}
                        ${createResultCard('Remplir les blancs', 'remplir', resultats.remplir)}
                        ${createResultCard('Ordre phrases', 'ordrePh', resultats.ordrePhrases)}
                    </div>
                </div>
            </div>
        </div>
        
        <style>
.profile-overlay {
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

.profile-modal {
                position: relative;
                width: 95%;
                max-width: 1200px;
                height: 90vh;
                background: var(--pr);
                border-radius: 24px;
                box-shadow: 0 25px 50px -12px rgba(var(--comp), 0.25);
                animation: slideUp 0.4s ease-out;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

.profile-close-btn {
                position: absolute;
                top: 16px;
                right: 16px;
                width: 40px;
                height: 40px;
                border: none;
                background: var(--secc);
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                color: var(--text-light);
                z-index: 10;
            }

            .profile-close-btn:hover {
                background: var(--comp);
                color: var(--pr);
                transform: rotate(90deg);
            }

.profile-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                border-bottom: 1px solid var(--secc);
            }

            .profile-header-right {
                display: flex;
                align-items: center;
                gap: 16px;
            }

            .profile-logo img {
                width: 50px;
                height: auto;
            }

            .profile-date {
                font-size: 0.9rem;
                color: var(--sec);
                font-weight: 500;
                margin-right: 60px;
            }

            .profile-content {
                display: flex;
                gap: 24px;
                padding: 24px;
                flex: 1;
                overflow: hidden;
            }

.user-info-card {
                width: 280px;
                background: linear-gradient(180deg, var(--pr) 0%, var(--pr) 50%, var(--pr) 100%);
                border-radius: 20px;
                padding: 24px;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                flex-shrink: 0;
                border: 1px solid var(--secc);
            }

            .user-avatar {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                overflow: hidden;
                margin-bottom: 16px;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
                border: 3px solid var(--comp);
            }

            .user-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .user-name {
                font-size: 1.3rem;
                font-weight: 700;
                color: var(--secf);
                margin-bottom: 12px;
            }

            .user-status {
                margin-bottom: 16px;
            }

            .status-premium {
                background: linear-gradient(135deg, #ffd700, #ffb700);
                color: var(--secf);
                padding: 8px 20px;
                border-radius: 25px;
                font-weight: 700;
                font-size: 0.85rem;
                box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
            }

            .status-waiting {
                background: linear-gradient(135deg, #ffa500, #ff8c00);
                color: var(--pr);
                padding: 8px 20px;
                border-radius: 25px;
                font-weight: 600;
                font-size: 0.85rem;
            }

            .user-email {
                font-size: 0.85rem;
                color: var(--sec);
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .user-email i {
                color: var(--comp);
            }

            .user-minutes {
                width: 100%;
                background: var(--pr);
                border-radius: 12px;
                padding: 16px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            }

            .minutes-unlimited {
                background: linear-gradient(135deg, #fff9e6, #ffd700);
                color: var(--warning);
                font-weight: 700;
                padding: 10px 15px;
                border-radius: 10px;
                font-size: 0.9rem;
            }

            .minutes-bar-container {
                width: 100%;
                height: 8px;
                background: var(--secc);
                border-radius: 4px;
                overflow: hidden;
                margin-top: 8px;
            }

            .minutes-bar {
                height: 100%;
                background: linear-gradient(90deg, var(--comp), var(--comp));
                border-radius: 4px;
                transition: width 0.3s ease;
            }

            .minutes-text {
                font-size: 0.85rem;
                color: var(--sec);
                font-weight: 500;
            }

.results-section {
                flex: 1;
                display: flex;
                flex-direction: column;
                ooverflow: hidden;
            }

            .section-title {
                font-size: 1.2rem;
                font-weight: 700;
                color: var(--secf);
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .section-title i {
                color: var(--comp);
            }

            .results-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                gap: 20px;
                overflow-y: auto;
                padding: 10px;
            }

            .result-card {
                background: var(--pr);
                border-radius: 16px;
                padding: 20px;
                box-shadow: 0 4px 15px rgba(var(--comp), 0.1);
                border: 1px solid var(--secc);
                transition: all 0.3s ease;
            }

            .result-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 25px rgba(var(--comp), 0.2);
                border-color: var(--comp);
            }

            .result-card h4 {
                font-size: 1rem;
                font-weight: 700;
                color: var(--secf);
                margin-bottom: 16px;
                text-align: center;
            }

            .result-stats {
                display: flex;
                justify-content: center;
                gap: 30px;
                margin-bottom: 16px;
            }

            .stat-item {
                text-align: center;
            }

            .stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--comp);
            }

            .stat-label {
                font-size: 0.75rem;
                color: var(--comp);
                font-weight: 500;
                margin-top: 4px;
            }

.result-actions {
                display: flex;
                justify-content: center;
                gap: 12px;
            }

            .btn-redo {
                display: flex;
                align-items: center;
                gap: 6px;
                padding: 8px 16px;
                background: linear-gradient(135deg, var(--pr), var(--secc));
                border: 1px solid var(--comp);
                border-radius: 8px;
                font-size: 0.85rem;
                color: var(--comp);
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .btn-redo:hover {
                background: linear-gradient(135deg, var(--comp), var(--comp));
                color: var(--pr);
            }

            .btn-redo i {
                font-size: 0.9rem;
            }

            .result-chart {
                margin-top: 12px;
                background: linear-gradient(135deg, var(--pr), var(--pr));
                border-radius: 10px;
                padding: 12px;
                height: 150px;
                border: 1px solid var(--secc);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .chart-title {
                font-size: 0.7rem;
                color: var(--comp);
                font-weight: 600;
                margin-bottom: 6px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .bars-container {
                display: flex;
                align-items: flex-end;
                justify-content: center;
                gap: 6px;
                height: 24px;
            }

            .bar {
                width: 18px;
                background: linear-gradient(180deg, #ffd700, var(--comp));
                border-radius: 3px 3px 0 0;
                transition: all 0.3s ease;
                position: relative;
                min-height: 4px;
            }

            .bar:hover {
                background: linear-gradient(180deg, #ffb700, var(--comp));
                transform: scaleY(1.1);
            }

            .bar::after {
                content: attr(data-score);
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 0.65rem;
                font-weight: 700;
                color: var(--comp);
                opacity: 0;
                transition: opacity 0.2s;
                white-space: nowrap;
            }

            .bar:hover::after {
                opacity: 1;
            }

            .bar.empty {
                background: var(--secc);
            }

            .myLineChart {
                max-height: 60px !important;
            }

            @media screen and (max-width: 900px) {
                .profile-content {
                    flex-direction: column;
                    overflow-y: auto;
                }
                
                .user-info-card {
                    width: 100%;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 16px;
                }
                
                .user-minutes {
                    width: auto;
                    flex: 1;
                    min-width: 200px;
                }
                
                .results-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media screen and (max-width: 600px) {
                .results-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </div>`
    document.body.appendChild(div)
    document.body.style.overflow = "hidden"

    const profileDate = div.querySelector('.profile-date')
    const profileClose = div.querySelector('.profile-close-btn')
    
    const date = new Date()
    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }
    profileDate.innerHTML = date.toLocaleDateString('fr-FR', options)

    // Event listeners for redo buttons
    attachRedoListeners(div, 'qcm', qcm)
    attachRedoListeners(div, 'vf', vf)
    attachRedoListeners(div, 'remplir', remplirVide)
    attachRedoListeners(div, 'ordrePh', ordrePhrases)

    profileClose.addEventListener('click', () => {
        div.style.animation = 'fadeOut 0.2s ease-out forwards';
        setTimeout(() => {
            document.body.style.overflow = "auto"
            div.remove()
        }, 200);
    })

    function getStatusBadge(role) {
        switch(role) {
            case 'premium':
                return '<span>👑 COMPTE PREMIUM</span>';
            case 'attente_premium':
                return '<span>⏳ En attente Premium</span>';
            case 'non_verifie':
                return '<span>📧 Non vérifié</span>';
            default:
                return '<span>Compte Basic</span>';
        }
    }

    function getMinutesDisplay(role, mins) {
        if (role === 'premium') {
            return `<div class="minutes-unlimited">⚡ ACCÈS ILLIMITÉ</div>`;
        }
        const percentage = Math.min((mins / 10) * 100, 100);
        return `
            <div class="minutes-text">${mins} minutes gratuites</div>
            <div class="minutes-bar-container">
                <div class="minutes-bar" style="width: ${percentage}%"></div>
            </div>
        `;
    }

    function createResultCard(title, type, data) {
        const scores = data?.scores || [];
        const lastSession = data?.lastSession || [];
        const score = data?.score || 0;
        const nbrQsts = data?.nbrQsts || 0;
        const maxScore = nbrQsts || 10;
        
        // Generate bars HTML (last 6 scores, reversed to show oldest to newest)
        const reversedScores = [...scores].slice(-6).reverse();
        const barsHTML = reversedScores.map((s, i) => {
            const percentage = Math.min((s / maxScore) * 100, 100);
            const height = Math.max(percentage, 10);
            return `<div class="bar ${s === 0 ? 'empty' : ''}" style="height: ${height}%" data-score="${s}/${maxScore}"></div>`;
        }).join('');
        
        return `
            <div class="result-card">
                <h4>${title}</h4>
                <div class="result-stats">
                    <div class="stat-item">
                        <div class="stat-value">${score}/${nbrQsts}</div>
                        <div class="stat-label">Score</div>
                    </div>
                </div>
                <div class="result-actions">
                    <button class="btn-redo ${type}-last-session">
                        <i class="fas fa-redo"></i> Refaire
                    </button>
                </div>
                <div class="result-chart">
                    <div class="chart-title">Évolution (6 sessions)</div>
                    <div class="bars-container">
                        ${barsHTML}
                    </div>
                </div>
            </div>
        `;
    }

    function attachRedoListeners(container, type, exerciseFn) {
        const btn = container.querySelector(`.${type}-last-session`);
        if (!btn) return;
        
        btn.addEventListener('click', () => {
            const data = getProfile()?.resultats?.[type]?.lastSession || [];
            if (data.length === 0) return;
            exerciseFn(div, data);
        });
    }

    // No more Chart.js - using CSS bars instead
    // Charts are now rendered directly in HTML via createResultCard function
}
