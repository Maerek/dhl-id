// ==UserScript==
// @name         DHL Helper - Pokaż ID po Załadowaniu (Wersja 1.0)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Wyświetla komunikat z numerem id punktu.
// @author       spam46200 (Gemini 2.5 Pro)
// @match        *://parcelshop.dhl.pl/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';

    const showInfo = (panel) => {
        const sapInput = panel.querySelector('#sapId');
        const nameContainer = panel.querySelector('.details-name');
        const streetInput = panel.querySelector('#street');
        const streetNoInput = panel.querySelector('#streetNo');
        const zipInput = panel.querySelector('#zip');
        const cityInput = panel.querySelector('#city');

        if (!sapInput || !sapInput.value || !nameContainer) {
            return;
        }

        const pointName = nameContainer.textContent.trim();
        const address = `${streetInput.value} ${streetNoInput.value}, ${zipInput.value} ${cityInput.value}`;

        alert(
            `Nazwa punktu: ${pointName}\n` +
            `Adres: ${address}\n\n` +
            `ID (SAP): ${sapInput.value}`
        );
    };

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type !== 'attributes' || mutation.attributeName !== 'style') {
                continue;
            }

            const target = mutation.target;

            if (target.classList.contains('loader') && target.style.display === 'none') {
                const panel = target.closest('.item-details');
                if (panel) {
                    showInfo(panel);
                }
            }
        }
    });

    observer.observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ['style']
    });

})();
