
# rosana.ds

<div align="center"><img src="./rosana.png" width="100" /></div>

<div align="center">
    <img alt="MIT Licensed" src="https://img.shields.io/badge/license-MIT-blue.svg">
    <img alt="Version Badge" src="https://img.shields.io/badge/version-1.2.0-brightgreen.svg">
</div>

<br>

**rosana.ds** is a powerful and lightweight framework designed for building reactive and dynamic web applications. It offers a variety of utilities for component-based development, including a reactive signal system, conditional rendering, and efficient event management.

## Installation

To install the project, you can choose between the npm package or the jsr package:

- **Using npm**:
    ```bash
    npm install rosana
    ```

- **Using deno**:
    ```bash
    deno add jsr:@roseframework/rosana
    ```

## Documentation

The documentation is still in progress. However, this framework is fully functional, and you can start using it by checking out the code examples and LSP suggestions provided.

Before diving into the documentation, be sure to check out the `App.js` file in the `Components` folder for an example of how to set up your application.

### Example Usage

#### In Your `App.js` File:

```javascript
// Importing necessary functions from rosana
import { renderApplication, pageRouter } from "rosana";
import homePage from "./pages/+homePage";

// Define routes for your application
const routes = [
    { path: "/", component: homePage },
    {
        path: "/about",
        component: function () {
            return import("./pages/aboutPage");
        },
    },
];

// Set up routing and render the application
pageRouter(routes);
renderApplication(homePage).mountView("#app");
```
#### In `homePage.ts` File:

```javascript
import { Container, Button } from 'rosana';

// Create the home page layout
const homePage = new Container('linear', 'fillxy, vcenter');

// Create a button and add it to the home page
let btn = Button('Click Me', {
    parent: homePage
});

export homePage;
```

## Features

### Reactivity with Signals

Rosana provides an in-built `signal` function for reactivity. It works as a setter/getter function and provides a subscription mechanism to react to changes.

```javascript
let theme: Signal<string> = signal("light");

theme.subscribe((mode) => {
    console.log(mode); // Will log 'dark' when theme.value is updated
});

theme.value = "dark"; // Update the theme
```

### Conditional Rendering with `showIF`

The `showIF` function conditionally shows or hides elements based on the truthiness of a given value. This function is useful for toggling between components or DOM elements based on some condition.

```javascript
showIF(restingParameter, onTruthyElement, onFalslyElement);
```

### Efficient Event Management with `onPress`

Rosana introduces an efficient approach to event management by using a global `onPress` event handler. This method maps the `id` of an element to a handler function, and a global listener checks clicks against the map. This reduces memory usage by avoiding multiple event listeners.

```javascript
let button = Button('Hello World', {
    parent: homePage
});

// Assign a function to handle the button press
button.onPress = () => {
    alert("Hello World!");
};
```

For more in-depth information, check out the documentation:

1. [Getting Started](./docs/+getting-started.md)
2. [Widgets Documented](./docs/widgets.md)

## Contributing

To contribute to **rosana.ds**, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your fork (`git push origin feature-branch`).
5. Create a Pull Request to the main repository.

Feel free to suggest new features you think would be useful for the framework.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
