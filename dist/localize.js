import { componentController } from "./control.js";
import { $signal } from "./signals.js";
const defaultLanguage = navigator.language;
const defaultLangCode = defaultLanguage.split("-")[0];
let translations = {};
/**@type {any} */
let currentLang;
/**
 * Loads the translations from a given JSON source and sets the default language.
 * @param {string} [defaultLang=defaultLangCode] - The default language code (e.g., 'en').
 * @param {string} jsonSource - The URL to the JSON file containing translation data.
 * @returns {Promise<void>} A promise that resolves when the translations are loaded.
 */
// @ts-ignore
export const $localize = async function (defaultLang = defaultLangCode, jsonSource) {
    currentLang = $signal(defaultLang);
    const response = await fetch(jsonSource);
    if (!response.ok) {
        console.log("Translation File Not Loaded");
        return;
    }
    const loadedTranslations = await response.json();
    translations = { ...translations, ...loadedTranslations };
};
/**
 * Sets the current language by updating the signal.
 * @param {string} langCode - The language code (e.g., 'en', 'fr').
 */
export const $setLanguage = function (langCode) {
    currentLang.value = langCode;
};
/**
 * Returns the localized text for a given key, applying any provided placeholders.
 * @param {string} key - The key used to look up the translation.
 * @param {object} [placeholders] - An optional object of placeholders to replace in the translation.
 * @returns {string} The localized text, with placeholders replaced if provided.
 */
let $localizedText = function (key, placeholders) {
    if (!currentLang || !currentLang.value) {
        return key;
    }
    // @ts-ignore
    const langData = translations[currentLang.value] || translations[defaultLangCode] || {};
    let translation = langData[key] || key;
    if (placeholders) {
        Object.keys(placeholders).forEach((placeholder) => {
            // @ts-ignore
            translation = translation.replace(`{${placeholder}}`, placeholders[placeholder]);
        });
    }
    return translation;
};
/**
 * Sets the text content of the component based on the current language, and updates it when the language changes.
 * @param {string} key - The key used to look up the translation.
 * @param {object} [placeholders] - An optional object of placeholders to replace in the translation.
 * @returns {Promise<void>} A promise that resolves when the localized text is set.
 */
// @ts-ignore
componentController.prototype.localizedText = async function (key, placeholders) {
    if (!currentLang || !currentLang.value) {
        // @ts-ignore
        return key;
    }
    const localizedText = await $localizedText(key, placeholders);
    // @ts-ignore
    this.element.textContent = localizedText;
    // Subscribe to language changes and update the text accordingly
    currentLang.subscribe(async () => {
        const localizedText = await $localizedText(key, placeholders);
        // @ts-ignore
        this.element.textContent = localizedText;
    });
};
