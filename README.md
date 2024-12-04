# _rosana.ds

<div align="center"><img src="./dist/rosana.png" width="100" /></div>

<div align="center">
<img alt="MIT Licensed" src="https://img.shields.io/badge/license-MIT-blue.svg">
<img alt="Version Badge" src="https://img.shields.io/badge/version-1.0.54-brightgreen.svg">

</div>

<br>

rosana-js is a framework inspired by DroidScript that I have built because I am used to the mental model or thinking way that I am used to, when using DroidScript. However DroidScript is native to Android so i can't port it everywhere.

## Installation

To install the project, follow these steps:

- Install the npm package or jsr package:
- `npm install rosana`
- `deno add jsr:@roseframework/rosana`

## Documentation

I am working on it, at the moment you could look at the [DroidScript Docs](https://droidscript.github.io/Docs/docs/v265/app_Controls.htm) for each control then import eqaully familiar functions but use them as their `Add` alternative.

However before this check out the `main.js` File First In Componenets Folder.

For Example

```javascript
// In DroidScript Native
let parent = app.CreateLayout('linear', 'fillxy, vcenter')
let btn = app.AddButton(parent, text, width, height, options);

app.AddLayout(parent)
// In Rosana

import { PageLayout, Button } from 'rosana'

let parent = new PageLayout('linear', 'fillxy, vcenter')
let btn = Button(parent, text, width, height, options);

export parent;
```

## Features

### Reactivity Using Signals

Rosana comes with an in-built `signal` function, this function takes in a parameter and returns a setter/getter function and a subscriber.

```javascript
let theme = signal("light");

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

### Functional Component Authoring Model

TODO ~ I am being fr, i will write this.

### Event Managment /Specifically OnClick/

I implemented a Map that maps your elements id to the function you have set, then there is one global onclick event handling function - its monitoring all clicks happening in the document.

When a click happens it checks if the target maps to the element id's in the map, this is great because it causes less event handlers being attached to every element.

```javascript
let button = Button(parent, 'Hello World');
button.SetOnTouch(()=>{
    alert(`Hello World`)
});
```

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
