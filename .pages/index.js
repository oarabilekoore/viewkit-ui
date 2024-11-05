import { $localize, $suspense, $layout, $component, $setLanguage } from "../.src/reckt.core.js";

export const homePage = $layout("linear", "fillxy, vcenter");

let button = $component("button", homePage);
button.css`
    border: 2px solid #6200ea;
    color: #6200ea;
    background-color: transparent; 
    font-family: "Archivo", sans-serif;
    font-weight: 500; 
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem 1rem; 
    transition: background-color 0.3s, color 0.3s;
    
    &:hover {
        background-color: #6200ea; 
        color: white; 
    }

    &:active {
        background-color: #3700b3; 
        border-color: #3700b3; 
    }
`.on("click", () => {
    $setLanguage("fr");
});

let progressBar = $component("div", homePage, {
    role: "progressbar",
    ariaValuenow: "0",
    ariaValuemin: "0",
    ariaValuemax: "100",
});
progressBar.css`
    width: 100%;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    &::before {
        content: "";
        display: block;
        width: 0;
        height: 100%;
        background-color: #6200ea;
        transition: width 0.4s ease;
        border-radius: 4px 0 0 4px;
    }
`;

$suspense(loadAppData, progressBar, homePage).effects(() => {
    button.localizedText("greeting", { name: "Oarabile" });
});

async function loadAppData() {
    try {
        await $localize(
            "en",
            "https://raw.githubusercontent.com/oarabiledev/metro/main/translations.json"
        );
    } catch (e) {}
}
