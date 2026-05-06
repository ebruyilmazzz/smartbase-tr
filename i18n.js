// i18n Module for SmartBase Website
// Supports Turkish (tr) and English (en)

(function() {
    'use strict';

    // Load translations from JSON file
    let translations = {};
    let currentLang = 'tr'; // Default language

    // Detect browser language
    function detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('en')) {
            return 'en';
        }
        return 'tr'; // Default to Turkish
    }

    // Get language from localStorage or detect from browser
    function getInitialLanguage() {
        const storedLang = localStorage.getItem('smartbase_lang');
        if (storedLang && (storedLang === 'tr' || storedLang === 'en')) {
            return storedLang;
        }
        return detectBrowserLanguage();
    }

    // Load translations from JSON file
    async function loadTranslations() {
        try {
            const response = await fetch('translations.json');
            translations = await response.json();
            currentLang = getInitialLanguage();
            applyTranslations(currentLang);
            updateLanguageButton();
            updateDynamicWords();
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback: use default Turkish translations
            translations = {
                tr: {}, // Will use the HTML default text
                en: {}  // Will need to be loaded
            };
        }
    }

    // Get translation by key
    function getTranslation(key, lang = currentLang) {
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // Fallback to Turkish if translation not found in English
                if (lang === 'en') {
                    value = translations['tr'];
                    for (const k2 of keys) {
                        if (value && value[k2]) {
                            value = value[k2];
                        } else {
                            return key; // Return key if translation not found
                        }
                    }
                    return value;
                }
                return key; // Return key if translation not found
            }
        }
        
        return value;
    }

    // Apply translations to all elements with data-i18n attribute
    function applyTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getTranslation(key, lang);
            
            if (translation && translation !== key) {
                element.textContent = translation;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // Update language button text
    function updateLanguageButton() {
        const langText = document.getElementById('lang-text');
        const mobileLangText = document.getElementById('mobile-lang-text');
        
        if (langText) {
            langText.textContent = currentLang.toUpperCase();
        }
        if (mobileLangText) {
            mobileLangText.textContent = currentLang.toUpperCase();
        }
    }

    // Update dynamic words for hero section
    function updateDynamicWords() {
        const dynamicWords = translations[currentLang]?.hero?.dynamic_words || ['ERP', 'CRM', 'Özel Otomasyon', 'Dijital Dönüşüm'];
        window.dynamicWords = dynamicWords;
        
        // Update the dynamic text element if it exists
        const dynamicTextElement = document.getElementById('dynamic-text');
        if (dynamicTextElement && window.dynamicIndex !== undefined) {
            window.dynamicIndex = 0;
            dynamicTextElement.textContent = dynamicWords[0];
        }
    }

    // Switch language
    function switchLanguage(lang) {
        if (lang === currentLang) return;
        
        currentLang = lang;
        localStorage.setItem('smartbase_lang', lang);
        
        applyTranslations(lang);
        updateLanguageButton();
        updateDynamicWords();
    }

    // Initialize language switcher buttons
    function initLanguageSwitchers() {
        const desktopSwitch = document.getElementById('lang-switch');
        const mobileSwitch = document.getElementById('mobile-lang-switch');
        
        if (desktopSwitch) {
            desktopSwitch.addEventListener('click', () => {
                const newLang = currentLang === 'tr' ? 'en' : 'tr';
                switchLanguage(newLang);
            });
        }
        
        if (mobileSwitch) {
            mobileSwitch.addEventListener('click', () => {
                const newLang = currentLang === 'tr' ? 'en' : 'tr';
                switchLanguage(newLang);
            });
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadTranslations().then(() => {
                initLanguageSwitchers();
            });
        });
    } else {
        loadTranslations().then(() => {
            initLanguageSwitchers();
        });
    }

    // Expose functions globally for use in other scripts
    window.i18n = {
        switchLanguage,
        getTranslation,
        getCurrentLang: () => currentLang,
        getTranslations: () => translations
    };

})();
