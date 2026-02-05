import { modalDevenirPremium } from './components/misc/modals.js'

document.addEventListener('DOMContentLoaded', () => {
    const ctaPremium = document.querySelectorAll('.cta-premium');
    if (ctaPremium) {
        ctaPremium.forEach(cta => {
            cta.addEventListener('click', () => {
                modalDevenirPremium();
            });
        });
    }
});
