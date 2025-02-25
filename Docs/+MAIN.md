# innerscope docs

<br>
<div align="center">
    <img alt="MIT Licensed" src="https://img.shields.io/badge/license-MIT-blue.svg">
    <img alt="Version Badge" src="https://img.shields.io/badge/version-0.1.73-brightgreen.svg">
</div>

<br>

> **innerscope** is a type-safe, high-performance framework with minimal overhead designed for building reactive  applications, whilst being easy for non-frameworkers to adopt.

## How Innerscope Render's UI: 

Innerscope is a thin wrapper around the DOM, which means unlike popular alternatives and the use of a virtual-dom, 
every control you use is manipulated directly.

It uses signals, stores and showIF's for its reactivity.

For example: (Adding a button)

```javascript
import { Button } from "innerscope";

Button(firstParam, secondParam, thirdParam)
```

under the hood this is: 

```bash
var btn = document.createElement('button')
btn.textContent = TextLikeParam;
ParentParam.appendChild(btn)
PropertiesParam added to the object
```

This means that for every html element there is a function to represent it and is imported from the framework.

## Describing Acceptable Parameters in Controls

Every ui control takes in three parameters, in any order.
These have to be in these types: 

- A parent can be a Layout or any HTMLElement
- Text content for text accepting elements
- An object that has its record as that html's object properties

```javascript
import { Layout, Button } from "innerscope";

// Layouts are special, they take only 2 params
// That is the type (check next topic) and the Parent
Layout('Card', document.body);

// Every other control takes in the universal parameters in any order

Button('Hello World', LayoutRefernce, {
    onclick: function(){
        //
    }
})

// or

Button(LayoutReference)

// or

Button({
    onclick: function(){
        //
    }
}, LayoutRefernce)

// or

Button('Hello World')

// Also works for all other imports
```

## The next step building complex UI:

Firstly we have to initalize the application with the `Application` class; 


```typescript
import { Application } from "innerscope"

interface ApplicationConfig {
    title: string;
    icon?: string;
    statusbarcolor?: string;
    scrollbarvisibility?: "shown" | "hidden"
}

const application = new Application({}: ApplicationConfig)
```

Innerscope has a concept of layouts (these are divs with enhanced properties).
Layouts also take in the same type of parameters as other controls, except 
you need to specify the layout type.

There are 5 different layouts to choose from:
- linear
- absolute
- frame
- card

Here is how it is used: 

```javascript
import { Layout, Button } from "innerscope";

const application = new Application({
    title: 'Example App',
    scrollbarvisibility: 'hidden'
})

const page = Layout('Linear', application.root)

const btn = Button('Hello World', page);
```

## Reactivity In Innerscope

We use signals. 
-> TODO