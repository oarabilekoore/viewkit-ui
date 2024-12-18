

# rosana.ds - Documentation

<div align="center"><img src="../rosana.png" width="100" /></div>

<div align="center">
    <img alt="MIT Licensed" src="https://img.shields.io/badge/license-MIT-blue.svg">
    <img alt="Version Badge" src="https://img.shields.io/badge/version-1.2.0-brightgreen.svg">
</div>

<br>

## Introduction

`rosana.ds` is a UI framework designed to be simple and lightweight.It allows developers to build UI elements and manage layout and styling through a programmatic interface. This guide covers the creation of UI components, the use of layouts, and routing.

## Creating Widgets

In `rosana.ds`, components are referred to as **widgets**. These widgets are essentially containers or HTML elements that are styled and arranged within a parent element.

### Example: Home Page Layout

```javascript
import { Container, Heading, Image, Link } from "rosana";
import { home } from "../ui/styles";

// This is like the main app div that contains other smaller
// divs and html elements, we call these widgets
const homePage = new Container("linear", "fillxy, top");

// Then this is the like a div we built for the nav bar
const nav = new Container("linear", "fillx, vcenter", {
    parent: homePage,
    style: home.nav,
});

Heading("rosana.js", 1, {
    style: home.text,
    parent: nav,
});

const body = new Container("linear", "fillxy, vcenter", {
    style: home.body,
    parent: homePage,
});

Image("../rosana.png", {
    style: home.image,
    parent: body,
});

Link("Hello World", {
    style: home.button,
    to: "/about",
    parent: body,
}).onpress = () => {
    console.log("I know what you did from link");
};

export default homePage;
```

### Explanation

1. **Containers**: 
   - `Container` is used to create div-like elements to hold other widgets or elements. 
   - The `Container` constructor takes three arguments:
     - **Type**: Defines the layout type (`linear`, `absolute`, `frame`).
     - **Child Alignment Properties**: Defines the alignment of child elements. You can use multiple properties like `fillxy`, `top`, `vcenter`, etc.
     - **Options**: Optionally, pass additional properties such as `style` and `parent`. `style` allows the application of custom styles, while `parent` allows nesting.

   In the example, `homePage` is the main container of the page, and inside it, there are other containers like `nav` and `body`.

2. **Widgets**: 
   - `Heading`, `Image`, and `Link` are examples of widgets in this framework.
   - **Heading**: Displays a heading on the page. The first argument is the text, the second is the level (e.g., `1` for H1).
   - **Image**: Displays an image. The path to the image is the first argument, and the options like styling are passed in the second argument.
   - **Link**: Displays a clickable link. The first argument is the text, the `to` property specifies the destination URL, and `onpress` is the click handler.

   - There are many available widgets, check them here [Widgets Documentation](./widgets.md)

3. **Styling**:
   - Styling is handled by passing `style` properties to widgets. In this example, `home.nav`, `home.text`, `home.body`, `home.image`, and `home.button` are custom styles defined in `home.js`.

   ```javascript
   // Just a sample
   const home = {
       nav: {
           // Add styles for the nav bar
       }
   };
   ```

4. **Event Handling**:
   - The `onpress` property of `Link` is used to define a click event handler. In this example, when the link is clicked, a message is logged to the console.

## Layout Types

The `Container` widget supports several layout types that define how child elements are arranged:

1. **Linear**: Arranges child elements in a horizontal or vertical line.
2. **Absolute**: Allows free positioning of child elements.
3. **Frame**: Acts like a static container for positioning elements.
4. **Stack**: Stacks elements either vertically or horizontally.

## Alignment Properties

The alignment properties control how child elements are arranged within a container. Common alignment options include:

- `noscrollbar`: No scrollbar for the container.
- `scrollxy`: Enables scrolling in both x and y directions.
- `scrollx`: Enables horizontal scrolling.
- `scrolly`: Enables vertical scrolling.
- `top`: Aligns elements to the top of the container.
- `bottom`: Aligns elements to the bottom.
- `left`: Aligns elements to the left.
- `right`: Aligns elements to the right.
- `horizontal`: Aligns elements horizontally.
- `vertical`: Aligns elements vertically.
- `vcenter`: Centers elements vertically.
- `center`: Centers elements both horizontally and vertically.
- `fillxy`: Fills the entire container.
- `fillx`: Fills the container horizontally.
- `filly`: Fills the container vertically.

### Example:

```javascript
// This container fills the entire page and centers its children vertically
const container = new Container("linear", "fillxy, vcenter");
```

## Routing

Routing in `rosana.ds` is handled by defining a set of routes and components. The `pageRouter` function is used to manage page navigation.

```javascript
import { renderApplication, pageRouter } from "rosana";
import homePage from "./pages/homePage";

const routes = [
    { path: "/", component: homePage },
    { path: "/about", component: function () { return import("./pages/aboutPage"); } },
];

pageRouter(routes);
renderApplication(homePage).mountView("#app");
```

## Styling in rosana.ds

### Defining Styles

Styles are defined using the `StyleSheet` class, which allows you to create reusable styles.

```javascript
import { StyleSheet } from "rosana";

export const home = StyleSheet.Create({
    nav: {
        width: "100%",
        height: "60px",
        backgroundColor: "white",
    },
    text: {
        color: "black",
    },

    body: {
        backgroundColor: "orange",
    },

    image: {
        width: "150px",
        height: "auto",
        marginBottom: "20px",
    },

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

In this example, the `home` style object contains styles for the navigation bar (`nav`), text (`text`), body (`body`), image (`image`), and button (`button`). You can define custom styles for each element and apply them within widgets.

### Example: Not Found Page Styles

```javascript
export const notFound = StyleSheet.Create({
    container: {
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },

    notFoundText: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginTop: "20px",
    },

    oopsText: {
        fontSize: "16px",
        color: "#666",
        textAlign: "center",
        marginTop: "10px",
    },
});
```

## Conclusion

This is just a basic introduction to `rosana.ds`. The framework is designed to make UI development straightforward, with a clear structure for layouts, event handling, and routing. By following the examples and using the provided widgets, you can build applications quickly and efficiently.
