
# rosana.ds

<div align="center"><img src="./rosana.png" width="100" /></div>

<div align="center">
    <img alt="MIT Licensed" src="https://img.shields.io/badge/license-MIT-blue.svg">
    <img alt="Version Badge" src="https://img.shields.io/badge/version-1.3.0-brightgreen.svg">
</div>

<br>

> **rosana.ds** is a flexible and high-performance framework designed for building reactive and dynamic applications.

> By utilizing a UINode-based Virtual DOM (VDOM),
> it bridges UI concepts across multiple platforms,
> including web and native, 
> making it a versatile choice for modern app development.

## Installation

To install the framework, you can choose between npm or deno:

- **Using npm**:
    ```bash
    npm install rosana
    ```

- **Using deno**:
    ```bash
    deno add jsr:@roseframework/rosana
    ```

## Documentation

The documentation is evolving as the framework grows. Meanwhile, explore the provided examples and utilize LSP suggestions to get started quickly.

## Key Features

### UINode Tree for Multi-Platform Rendering

Rosana's VDOM system leverages a UINode tree to efficiently manage and update UI components. This makes the framework adaptable for rendering across various platforms.

```typescript
import { CreateLayout, Button, Image } from "rosana";
import { DOMRenderer } from "rosana";
import { home } from "./style";

const homePage = CreateLayout("linear", "fillxy,vcenter");

Button("Hello World", {
    styles: home.button,
    parent: homePage,
});

Button("Hello World 2", {
    parent: homePage,
});

const appRoot = document.getElementById("app")!;
window.RENDERER = new DOMRenderer(appRoot, homePage);

```

### Making Values Reactive With Signals

Signals provide a declarative way to handle reactivity, enabling efficient UI updates.

```typescript
import { signal } from 'rosana';

let count = signal(0);

count.subscribe((value) => {
    console.log(`Count is now: ${value}`);
});

count.value += 1;
```

### Making value's Observable With Observables

The function `makeThisObservable` adds an observe function to
your object and then it reports to you whenever the value's object properties are changed.

```typescript
import { makeThisObservable } from 'rosana';

let user = Object();
user = makeThisObservable(user);
user.observe((prop, value)=>{
    console.log(`prop: ${prop}`)
    console.log(`val: ${value}`)
})

// We add a value to the object :
user.name = 'Oarabile'

// This is logged to the console
// prop : name
// val : Oarabile
```

### Platform-Agnostic Rendering

By adopting a UINode tree structure, Rosana decouples rendering logic from platform-specific implementations. This allows developers to integrate with DOM renderers, native renderers, or custom backends.

### Enhanced Event Management

Rosana optimizes event handling by using centralized listeners, reducing memory overhead.

```typescript
import { Button } from 'rosana';

let button = Button('Submit', { parent: rootNode });

button.attributes = {
    onpress : function (){
        console.log('Button Pressed');
    }
};
```

### Defining Components

```typescript
import { Container, Button } from 'rosana';

const Card = Container('linear', ' center');

Button('Click Me', { parent: Card });

export default Card;
```

### Styling Components

We implement a similar methodology to react natives `StyleSheet.Create` or sylex's `stylesheet.create`.

You add the style property to the widgetproperties parameter of that ui object.

> Firstly define you script styles:

```typescript
import { StyleSheet } from "rosana";

export const home = StyleSheet.Create({
    nav: {
        width: "100%",
        height: "60px",
        backgroundColor: "white",
    }
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#61dafb",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#21a1f1",
        },
    },
});
```

> Then import and set that property:

```typescript
import { CreateLayout, Button, Image } from ".rosana";
import { DOMRenderer } from "rosana";
import { home } from "./style";

const homePage = CreateLayout("linear", "fillxy,vcenter");

Button("Hello World", {
    styles: home.button,
    parent: homePage,
});
...
````

## Contributing

We welcome contributions to **rosana.ds**! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make changes and commit (`git commit -am 'Add new feature'`).
4. Push to your fork (`git push origin feature-branch`).
5. Open a Pull Request.

Feel free to suggest new features and improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

