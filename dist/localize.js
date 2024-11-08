import { $uiControl } from "./+rosana.core.js";
import { $signal } from "./signals.js";
const defaultLanguage = navigator.language || navigator.userLanguage;
const defaultLangCode = defaultLanguage.split("-")[0];
let translations = {};
let currentLang;
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
export const $setLanguage = function (langCode) {
    currentLang.value = langCode;
};
let $localizedText = function (key, placeholders) {
    if (!currentLang || !currentLang.value) {
        return key;
    }
    const langData = translations[currentLang.value] || translations[defaultLangCode] || {};
    let translation = langData[key] || key;
    if (placeholders) {
        Object.keys(placeholders).forEach((placeholder) => {
            translation = translation.replace(`{${placeholder}}`, placeholders[placeholder]);
        });
    }
    return translation;
};
/**
 * Set the text accordingly to the languageCode and provided keys
 * @param {object} localizingFn
 * @param {string} key
 * @param {object} placeholders
 */
$uiControl.prototype.localizedText = async function (key, placeholders) {
    if (!currentLang || !currentLang.value) {
        return key;
    }
    const localizedText = await $localizedText(key, placeholders);
    this.element.textContent = localizedText;
    currentLang.subscribe(async () => {
        const localizedText = await $localizedText(key, placeholders);
        this.element.textContent = localizedText;
    });
};
