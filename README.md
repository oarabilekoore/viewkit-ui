# rosana.ds

<div align="center"><img src="./rosana.png" width="100" /></div>

<div align="center">
<img alt="MIT Licensed" src="https://img.shields.io/badge/license-MIT-blue.svg">
<img alt="Version Badge" src="https://img.shields.io/badge/version-1.1.59-brightgreen.svg">

</div>

<br>

rosana.ds is a framework I built that is based off how most native frameworks operate, I am used to
that mental model.

## Installation

To install the project, follow these steps:

- Install the npm package or jsr package:
- `npm install rosana`
- `deno add jsr:@roseframework/rosana`

## Documentation

I am working on it, however this framework is still usable if you look at this code and the lsp suggestions given.

However before this check out the `App.js` File First In Componenets Folder.

For Example

```javascript
// In Your App.js File :
import { renderApplication, pageRouter } from "rosana";
import homePage from "./pages/+homePage";

const routes = [
    { path: "/", component: homePage },
    {
        path: "/about",
        component: function () {
            return import("./pages/aboutPage");
        },
    },
];

pageRouter(routes);
renderApplication(homePage).mountView("#app");
```

```javascript
//In homePage.ts File :
import { Container, Button } from 'rosana'

const homePage = new Container('linear', 'fillxy, vcenter')
let btn = Button(text, {
    parent: homePage
});

export homePage;
```

## Features

### Reactivity Using Signals

Rosana comes with an in-built `signal` function, this function takes in a parameter and returns a setter/getter function and a subscriber.

```javascript
let theme:Signal<string> = signal("light");

theme.subscribe((mode) => {
    console.log(mode);
});

theme.value = "dark";
```

### Reactivity using showIF

rosana-js comes with this function, it takes in a restingParameter and based on the truthiness of it, an element will be shown.

```javascript
showIF(restingParameter, onTruthyElement, onFalslyElement);
```

### Event Managment An onclick Alternative.

I implemented a Map that maps your elements id to the function you have set, then there is one global onclick event handling function - its monitoring all clicks happening in the document.

When a click happens it checks if the target maps to the element id's in the map, this is great because it causes less event handlers being attached to every element.

Therefore it is recommended to use onPress instead.

```javascript
let button = Button('Hello World', {
    parent: homePage
});

button.onPress = ()=>{
    alert(`Hello World`)
};
```

Check out the documentation here 🧩

1. [Getting Started](./docs/+Getting_Started.md)

## Contributing

To contribute, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes and commit (git commit -am 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Create a Pull Request.

You can also suggest features that you want that i should add.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
