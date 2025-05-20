# innerscope Framework Documentation

<div align="center">
  <img alt="MIT Licensed" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img alt="Version Badge" src="https://img.shields.io/badge/version-0.2.0-brightgreen.svg">
</div>

> **innerscope** is a type-safe, high-performance framework with minimal overhead designed for building reactive applications, whilst being easy for non-frameworkers to adopt.

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Core Concepts](#core-concepts)
   - [Application Setup](#application-setup)
   - [Routing](#routing)
   - [Layouts](#layouts)
   - [UI Elements](#ui-elements)
4. [Lifecycle Events](#lifecycle-events)
5. [API Reference](#api-reference)
   - [Application API](#application-api)
   - [Layout API](#layout-api)
   - [UI Elements API](#ui-elements-api)
6. [Styling](#styling)
7. [Examples](#examples)
   - [Basic App Setup](#basic-app-setup)
   - [Creating a Landing Page](#creating-a-landing-page)
   - [Custom Components](#custom-components)
   - [Routing Between Pages](#routing-between-pages)
8. [Best Practices](#best-practices)

## Introduction

innerscope is a lightweight, modern TypeScript framework for building web applications without the complexity and overhead of larger frameworks. It follows a declarative approach with direct DOM manipulation, making it fast and efficient.

Key features:
- **Simple API**: Easy-to-understand methods for UI creation
- **Lightweight**: Minimal footprint for fast performance
- **Type-safe**: Built with TypeScript for better developer experience
- **Flexible routing**: Support for both hash and history routing modes
- **Layout system**: Intuitive layout components for common UI patterns
- **Event handling**: Standard DOM events with simplified approach

## Installation

To install the framework using a package manager:

```bash
# Using npm
npm install innerscope

# Using Bun
bun install innerscope
```

Alternatively, you can get started quickly by cloning the template repository:

```bash
git clone https://github.com/oarabilekoore/innerscope-template
cd innerscope-template
npm install
npm run dev
```

## Core Concepts

### Application Setup

The `Application` class is the entry point for your innerscope app. It initializes your application with configuration settings and manages routing.

```typescript
import { Application } from "innerscope";

// Create the application instance
const app = new Application({
    title: "My innerscope App",
    scrollbarvisibility: "hidden",
    statusbarcolor: "#252526",
    allowzoom: false,
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
    }
});

// Start the application with the initial page
app.onStart(HomePage);
```

### Routing

innerscope supports two routing modes:

1. **History mode**: Uses the HTML5 History API (`/path`)
2. **Hash mode**: Uses URL fragments (`#/path`)

Define routes in your application config:

```typescript
// routes.ts
import { PageRouterConfig } from "innerscope";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";

export const routes: PageRouterConfig = {
    mode: "history",
    routes: [
        { path: "/", component: HomePage },
        { path: "/about", component: AboutPage }
    ]
};
```

To navigate between routes:

```typescript
app.openRoute("/about");
```

### Layouts

Layouts in innerscope help organize your UI in a structured way. The framework provides several built-in layouts:

#### LinearLayout

A flexible layout that arranges elements either vertically or horizontally.

```typescript
import { Widget } from "innerscope";

const container = Widget.LinearLayout(parent);
container.LayoutDirection = "TOP_TO_BOTTOM"; // Vertical arrangement
container.ElementAlignment = "CENTER"; // Center align children
```

#### ColumnLayout

A specialized layout for vertical arrangements.

```typescript
const column = Widget.ColumnLayout(parent);
// Automatically sets direction to TOP_TO_BOTTOM
```

#### GridLayout

A layout that arranges elements in a grid format.

```typescript
const grid = Widget.GridLayout(parent);
grid.style.gridTemplateColumns = "repeat(3, 1fr)";
grid.style.gap = "16px";
```

### UI Elements

innerscope provides a comprehensive set of UI elements through the `Widget` namespace:

```typescript
import { Widget } from "innerscope";

// Text elements
const title = Widget.Heading1("My Application", container);
const paragraph = Widget.Paragraph("This is a sample application", container);

// Interactive elements
const button = Widget.Button("Click me", container);
button.onclick = () => console.log("Button clicked!");

// Input elements
const input = Widget.TextInput(container);
input.placeholder = "Enter your name";
```

## Lifecycle Events

innerscope provides several lifecycle events to manage your application:

```typescript
// Called when the application starts
app.onStart(() => {
    console.log("Application started");
});

// Called when the user is about to exit the application
app.onExit(() => {
    console.log("Application exiting");
});

// Called when the back button is pressed
app.onBack(() => {
    console.log("Back button pressed");
});

// Called when the window regains focus
app.onResume(() => {
    console.log("Application resumed");
});

// Called when the device goes offline
app.onOffline(() => {
    console.log("Device is offline");
});

// Called when the device goes online
app.onOnline(() => {
    console.log("Device is online");
});

// Called when the window is resized
app.onResize(() => {
    console.log("Window resized");
});

// Called when the page is scrolled
app.onScroll(() => {
    console.log("Page scrolled");
});
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
- `routes?`: PageRouterConfig - Routing configuration
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

### UI Elements API

innerscope provides wrapper functions for HTML elements through the `Widget` namespace:

#### Text Elements

- `Paragraph`, `Heading1`-`Heading6`, `Span`, `Strong`, etc.

#### Interactive Elements

- `Button`, `TextInput`, `Checkbox`, `Radio`, etc.

#### Form Elements

- `Form`, `TextArea`, `Select`, `Option`, etc.

#### Media Elements

- `Image`, `Video`, `Audio`, `Canvas`, etc.

#### Container Elements

- `Div`, `Section`, `Article`, etc.

#### Table Elements

- `Table`, `TableRow`, `TableHeader`, `TableData`, etc.

#### List Elements

- `OrderedList`, `UnorderedList`, `ListItem`, etc.

## Styling

innerscope elements can be styled using standard JavaScript DOM properties:

```typescript
const button = Widget.Button("Click me", container);
button.style.backgroundColor = "#007acc";
button.style.color = "#ffffff";
button.style.padding = "12px 24px";
button.style.borderRadius = "4px";
button.style.border = "none";
button.style.cursor = "pointer";
```

The framework also provides CSS utility classes in baseline.css:

- Layout classes: `top_to_bottom`, `left_to_right`, `center`, etc.
- Visibility classes: `show`, `hide`, `gone`
- Size classes: `fillxy`, `fillx`, `filly`
- Scroll classes: `scrollxy`, `scrollx`, `scrolly`, `noscrollbar`

## Examples

### Basic App Setup

```typescript
// index.ts
import { Application } from "innerscope";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";

export const app = new Application({
    title: "My innerscope App",
    scrollbarvisibility: "hidden",
    statusbarcolor: "#252526",
    allowzoom: false,
    routes: {
        mode: "history",
        routes: [
            { path: "/", component: HomePage },
            { path: "/about", component: AboutPage }
        ]
    }
});

app.onStart(HomePage);
```

### Creating a Landing Page

```typescript
// pages/home.ts
import { Widget } from "innerscope";
import { app } from "../index";

export default function HomePage() {
    const page = Widget.LinearLayout(app.root);
    page.ParentFill = "FILLXY";
    page.ScrollDirection = "VERTICAL";
    page.ElementAlignment = "VCENTER";
    page.LayoutDirection = "TOP_TO_BOTTOM";
    
    page.style.backgroundColor = "#1e1e1e";
    page.style.color = "#ffffff";
    page.style.fontFamily = "Arial, sans-serif";
    
    // Hero section
    const hero = Widget.LinearLayout(page);
    hero.ElementAlignment = "CENTER";
    hero.LayoutDirection = "TOP_TO_BOTTOM";
    hero.style.padding = "64px 32px";
    hero.style.textAlign = "center";
    
    const title = Widget.Heading1("Welcome to innerscope", hero);
    title.style.fontSize = "2.5rem";
    title.style.marginBottom = "16px";
    
    const description = Widget.Paragraph(
        "A lightweight framework for building modern web applications",
        hero
    );
    description.style.fontSize = "1.2rem";
    description.style.color = "#cccccc";
    description.style.marginBottom = "32px";
    
    const button = Widget.Button("Get Started", hero);
    button.style.backgroundColor = "#007acc";
    button.style.color = "#ffffff";
    button.style.padding = "12px 24px";
    button.style.borderRadius = "4px";
    button.style.border = "none";
    button.style.cursor = "pointer";
    
    button.onclick = () => app.openRoute("/about");
}
```

### Custom Components

Creating reusable components is easy in innerscope:

```typescript
// components/card.ts
import { Widget, Parent } from "innerscope";

export default function Card(title: string, description: string, parent: Parent) {
    const card = Widget.LinearLayout(parent);
    card.LayoutDirection = "TOP_TO_BOTTOM";
    
    card.style.backgroundColor = "#2d2d2d";
    card.style.padding = "24px";
    card.style.borderRadius = "8px";
    card.style.margin = "16px";
    card.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
    
    const cardTitle = Widget.Paragraph(title, card);
    cardTitle.style.fontSize = "1.5rem";
    cardTitle.style.fontWeight = "bold";
    cardTitle.style.marginBottom = "8px";
    
    const cardDescription = Widget.Paragraph(description, card);
    cardDescription.style.color = "#cccccc";
    cardDescription.style.marginBottom = "16px";
    
    const cardButton = Widget.Button("Read More", card);
    cardButton.style.alignSelf = "flex-start";
    
    return card;
}

// Usage
import Card from "./components/card";

const myCard = Card("Feature Title", "Description goes here", container);
```

### Routing Between Pages

```typescript
// routes.ts
import { PageRouterConfig } from "innerscope";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";

export const routes: PageRouterConfig = {
    mode: "history",
    routes: [
        { path: "/", component: HomePage },
        { path: "/about", component: AboutPage },
        { path: "/contact", component: ContactPage }
    ]
};

// Using routes in components
import { app } from "./index";

const nav = Widget.LinearLayout(parent);
nav.LayoutDirection = "LEFT_TO_RIGHT";

const homeButton = Widget.Button("Home", nav);
homeButton.onclick = () => app.openRoute("/");

const aboutButton = Widget.Button("About", nav);
aboutButton.onclick = () => app.openRoute("/about");

const contactButton = Widget.Button("Contact", nav);
contactButton.onclick = () => app.openRoute("/contact");
```

## Best Practices

1. **Component Organization**: Create reusable UI components in separate files for better code organization.

2. **Type Safety**: Take advantage of TypeScript interfaces for better type checking and developer experience.

3. **Element Creation**: Always specify a parent when creating elements to ensure they're properly added to the DOM.

4. **Styling Structure**: 
   - Apply common styles through CSS utility classes
   - Apply specific styles directly to elements using the style property
   - Consider creating style helper functions for frequently used styles

5. **Layout Usage**: Use the appropriate layout component for your needs:
   - LinearLayout for simple stacked or row arrangements
   - ColumnLayout for vertical stacking
   - GridLayout for grid-based layouts

6. **Memory Management**: Remove event listeners when components are no longer needed to prevent memory leaks.

7. **Route Organization**: Keep route definitions in a separate file for better maintainability.

8. **Application Events**: Use application lifecycle events for initialization and cleanup tasks.

9. **Parent-Child Relationships**: Understand the Parent interface and how layouts manage their children.

10. **Widget Namespace**: Use the Widget namespace to access all UI element creation functions.

---

innerscope is designed to be intuitive, lightweight, and high-performance. It strikes a balance between simplicity and power, making it suitable for both small projects and larger applications. For more information or to contribute to the framework, visit the [GitHub repository](https://github.com/oarabilekoore/innerscope).
