
<div align="center"><img src=".src/.images/fire.png" width="100" /></div>

<div align="center">
<img alt="MIT Licensed" src="https://img.shields.io/badge/license-MIT-blue.svg">
<img alt="Version Badge" src="https://img.shields.io/badge/version-0.0.1-brightgreen.svg">
</div>

<br>

Reckt.js is a framework library for creating perfomant ui using functional themed programming.

Reckt uses signals to power the reactivity and offers most things not available nativley compared to other libraries.

## Installation

To install the project, follow these steps:

Reckt is available installable using npm;

```bash
npm install reckt
```

You can check out the Reckt.JS Sample App here :

[Reckt.JS Sample App](randomString)

## Features

### Authoring Components Reactivley

We can make our own components by using the `$component` function, which has methods like `.css` and `.on` and more.

Note that every core reckt function has the `$` as the first letter, do not author functions in the same manner, we do this to provide a strict mental model to differentiate `reckt` functions from app functions.

The `$component` function takes in these parameters and extends `$uiControl` therefore it has these methods:

- on
- css
- gone
- hide
- show
- batch
- addChild
- removeChild

```javascript
$component(tag, parent, props)
```

```javascript
import {$component} from 'reckt';

let button = $component('button', homePage, {textContent: 'an outlined button'}).css`
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
`.on('click', ()=>{
    console.log('Our First Component 🔥')
});
```

### Internalization Made Easy

We use the `$localize` and the `$component` method `localizedText` to let the textContent of the component set to the given language.

```javascript
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

let loaderImage = $component("img", homePage, {
    src: './'
});
loaderImage.css`
    width: 100%;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
`;

$suspense(loadAppData, loaderImage, homePage).effects(() => {
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
```
