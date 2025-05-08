# innerscope Framework Documentation

**Version: 0.1.9**

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Core Concepts](#core-concepts)
   - [Application](#application)
   - [Routing](#routing)
   - [Layouts](#layouts)
   - [UI Elements](#ui-elements)
4. [API Reference](#api-reference)
   - [Application API](#application-api)
   - [Layout API](#layout-api)
   - [HTML Elements API](#html-elements-api)
5. [Styling](#styling)
6. [Event Handling](#event-handling)
7. [Examples](#examples)
8. [Best Practices](#best-practices)

## Introduction

innerscope is a lightweight, modern TypeScript framework for building web applications. It provides a simple and intuitive API for creating responsive user interfaces without the complexity of larger frameworks. innerscope follows a component-based architecture with direct DOM manipulation.

Key features:
- **Simple API**: Easy-to-understand methods for UI creation
- **Lightweight**: Minimal footprint for fast performance
- **Type-safe**: Built with TypeScript for better developer experience
- **Flexible routing**: Support for both hash and history routing modes
- **Layout system**: Built-in layout components for common UI patterns

## Installation

To get started clone the template repository then install all required dependencies then after all that run the project. Here are all the commands needed to do this.

```
git clone https://github.com/oarabilekoore/innerscope-template
npm install
npm run dev
```

## Core Concepts

### Application

The `Application` class is the entry point of your innerscope app. It initializes your application with configuration settings and manages routing.

```typescript
import { Application } from "innerscope";

const app = new Application({
    title: "My innerscope App",
    routes: {
        mode: "history", // or "hash"
        routes: [
            {
                path: "/",
                component: HomePage
            },
            {
                path: "/about",
                component: AboutPage
            }
        ]
    },
    scrollbarvisibility: "hidden", // or "shown"
    statusbarcolor: "#252526",
    allowzoom: false
});

// Initialize with the first page
app.onStart(HomePage);
```

### Routing

innerscope supports two routing modes:

1. **History mode**: Uses the HTML5 History API (`/path`)
2. **Hash mode**: Uses URL fragments (`#/path`)

Define routes as follows:

```typescript
const routes = {
    mode: "history",
    routes: [
        { path: "/", component: HomePage },
        { path: "/about", component: AboutPage }
    ]
};

// Navigate to a route
app.openRoute("/about");
```

### Layouts

Layouts in innerscope are structured components that help organize your UI. The framework provides several built-in layouts:

#### LinearLayout

A simple layout that arranges elements in a line (either vertically or horizontally).

```typescript
import { LinearLayout, Paragraph } from "innerscope";

export function MyComponent(parent) {
    const container = LinearLayout(parent);
    container.LayoutDirection = "TOP_TO_BOTTOM";
    container.ElementAlignment = "CENTER";
    
    Paragraph("Hello World!", container);
}
```

#### ColumnLayout

A specialized layout for vertical arrangements.

```typescript
import { ColumnLayout } from "innerscope";

const column = ColumnLayout(parent);
// ColumnLayout automatically sets direction to TOP_TO_BOTTOM
```

#### GridLayout

A layout that arranges elements in a grid format.

```typescript
import { GridLayout } from "innerscope";

const grid = GridLayout(parent);
grid.style.gridTemplateColumns = "repeat(3, 1fr)";
grid.style.gap = "16px";
```

### UI Elements

innerscope provides a comprehensive set of HTML elements that can be created and appended to layouts or other elements.

```typescript
import { Paragraph, Button, Heading1 } from "innerscope";

const title = Heading1("My Application", container);
const description = Paragraph("This is a sample application", container);
const button = Button("Click me", container);

// Add event listeners
button.onclick = () => alert("Button clicked!");
```

## API Reference

### Application API

#### Constructor

```typescript
new Application(config: ApplicationConfig)
```

**ApplicationConfig properties:**
- `title`: string - The title of your application (sets document.title)
- `icon?`: string - Icon URL (optional)
- `routes`: PageRouterConfig - Routing configuration
- `allowzoom?`: boolean - Whether to allow zooming (default: false)
- `statusbarcolor?`: string - Status bar color for mobile devices
- `scrollbarvisibility?`: "shown" | "hidden" - Whether to show scrollbars

#### Methods

- `setConfig(config: ApplicationConfig)`: Configure the application
- `onStart(callback: Function)`: Execute function when app loads
- `onExit(callback: Function)`: Execute function before app unloads
- `onBack(callback: Function)`: Execute function on browser back button
- `onResume(callback: Function)`: Execute function when window gains focus
- `onOffline(callback: Function)`: Execute function when connection is lost
- `onOnline(callback: Function)`: Execute function when connection is restored
- `onResize(callback: Function)`: Execute function when window is resized
- `onScroll(callback: Function)`: Execute function when page is scrolled
- `openRoute(path: string)`: Navigate to specified route
- `addRoute(path: string, component: Function)`: Add new route dynamically

### Layout API

All layout components implement the `Parent` interface and share these methods:

- `appendChild(child: HTMLElement)`: Add a child element
- `removeChildren()`: Remove all children
- `removeChild(child: HTMLElement)`: Remove specific child
- `insertBefore(child: HTMLElement, before: HTMLElement)`: Insert child before another

#### Layout Properties

- `LayoutDirection`: "TOP_TO_BOTTOM" | "BOTTOM_TO_TOP" | "LEFT_TO_RIGHT" | "RIGHT_TO_LEFT"
- `ElementAlignment`: "CENTER" | "LEFT" | "BOTTOM" | "RIGHT" | "VCENTER" | "HCENTER"
- `ParentFill`: "FILLXY" | "FILLX" | "FILLY"
- `ScrollDirection`: "HORIZONTAL" | "VERTICAL" | "BOTH"
- `ScrollBarVisibility`: "SHOWN" | "HIDDEN"

### HTML Elements API

innerscope provides wrapper functions for most HTML elements. Each element function follows this signature:

```typescript
function Element(parent: Parent | HTMLElement, text?: string): HTMLElement
// or
function Element(text: string, parent: Parent | HTMLElement): HTMLElement
```

Some commonly used elements:

- Text elements: `Paragraph`, `Heading1`-`Heading6`, `Span`, etc.
- Interactive elements: `Button`, `TextInput`, `Checkbox`, etc.
- Form elements: `Form`, `TextArea`, `Select`, etc.
- Media elements: `Image`, `Video`, `Audio`, etc.
- Container elements: `Div`, `Section`, `Article`, etc.

## Styling

Elements can be styled using standard JavaScript DOM properties:

```typescript
const button = Button("Click me", container);
button.style.backgroundColor = "#007acc";
button.style.color = "#ffffff";
button.style.padding = "12px 24px";
button.style.borderRadius = "4px";
```

innerscope also provides CSS utility classes in baseline.css:

- Layout classes: `top_to_bottom`, `left_to_right`, `center`, etc.
- Visibility classes: `show`, `hide`, `gone`
- Size classes: `fillxy`, `fillx`, `filly`
- Scroll classes: `scrollxy`, `scrollx`, `scrolly`, `noscrollbar`

## Event Handling

innerscope uses standard DOM event handling:

```typescript
const button = Button("Click me", container);
button.onclick = () => {
    console.log("Button clicked");
    app.openRoute("/about");
};

// Or using addEventListener
button.addEventListener("click", () => {
    console.log("Button clicked");
});
```

## Examples

### Basic Page Structure

```typescript
import { LinearLayout, Heading1, Paragraph, Button } from "innerscope";
import { app } from "./index.ts";

export default function HomePage() {
    const page = LinearLayout(app.root);
    page.ParentFill = "FILLXY";
    page.LayoutDirection = "TOP_TO_BOTTOM";
    page.ElementAlignment = "CENTER";
    
    const title = Heading1("Welcome", page);
    title.style.fontSize = "2rem";
    title.style.marginBottom = "16px";
    
    const description = Paragraph("This is a sample innerscope application", page);
    description.style.marginBottom = "32px";
    
    const button = Button("Learn More", page);
    button.style.padding = "12px 24px";
    button.style.backgroundColor = "#007acc";
    button.style.color = "#ffffff";
    button.style.border = "none";
    button.style.borderRadius = "4px";
    button.style.cursor = "pointer";
    
    button.onclick = () => app.openRoute("/about");
}
```

### Creating a Custom Component

```typescript
import { LinearLayout, Paragraph, Button, Parent } from "innerscope";

export default function Card(title: string, description: string, parent: Parent) {
    const card = LinearLayout(parent);
    card.LayoutDirection = "TOP_TO_BOTTOM";
    card.style.backgroundColor = "#2d2d2d";
    card.style.padding = "24px";
    card.style.borderRadius = "8px";
    card.style.margin = "16px";
    card.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
    
    const cardTitle = Paragraph(title, card);
    cardTitle.style.fontSize = "1.5rem";
    cardTitle.style.fontWeight = "bold";
    cardTitle.style.marginBottom = "8px";
    
    const cardDescription = Paragraph(description, card);
    cardDescription.style.color = "#cccccc";
    cardDescription.style.marginBottom = "16px";
    
    const cardButton = Button("Read More", card);
    cardButton.style.alignSelf = "flex-start";
    
    return card;
}

// Usage
Card("Feature Title", "Description goes here", container);
```

## Best Practices

1. **Component Organization**: Create reusable UI components in separate files
2. **Page Structure**: Use layouts to create a clear page structure
3. **Event Handlers**: Keep event handlers close to the elements they affect
4. **Type Safety**: Use TypeScript interfaces for better type checking
5. **CSS Classes**: Use provided utility classes for common layout patterns
6. **Styling**: Apply styles directly to elements using the style property
7. **Routing**: Use the appropriate routing mode based on your deployment setup
8. **Application Events**: Use application life cycle events for initialization and cleanup
9. **Parent-Child Relationships**: Always specify parent when creating elements
10. **Memory Management**: Remove event listeners when components are no longer needed

---

This documentation covers the basic usage of the innerscope framework. For more advanced usage or specific questions, please refer to the source code or contact the framework developers.
