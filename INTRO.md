# squidBASE Framework Documentation

A lightweight TypeScript framework for building modern web applications with reactive state management, routing, and component-based architecture.

## Table of Contents

-   [Installation](#installation)
-   [Core Concepts](#core-concepts)
-   [HTML Elements](#html-elements)
-   [State Management](#state-management)
-   [Styling](#styling)
-   [Routing](#routing)
-   [Examples](#examples)
-   [API Reference](#api-reference)

## Installation

```bash
# Import the library
import { html, signal, css, Router, effect, computed } from "squidbase";
```

## Core Concepts

This framework provides a functional approach to building web applications with:

-   **HTML Element Creation**: Type-safe DOM element generation with flexible parameter ordering
-   **Reactive State**: Signal-based state management with automatic dependency tracking
-   **CSS-in-JS**: Dynamic styling with auto-generated class names using djb2 hashing
-   **Client-side Routing**: SPA routing with animations and guards
-   **Effects System**: Reactive computations and side effects

## HTML Elements

The `html` object provides methods to create all standard HTML elements with type safety and flexible parameter ordering.

### Basic Usage

```typescript
import { html } from "squidbase";

// Create elements with text content
const heading = html.h1("Welcome to My App");
const paragraph = html.p("This is a paragraph of text");

// Create elements with parent
const container = html.div();
const button = html.button("Click Me", container);

// Create elements with children
const list = html.ul([html.li("Item 1"), html.li("Item 2"), html.li("Item 3")]);
```

### Flexible Parameter System

The framework uses a flexible argument parsing system that accepts parameters in any order:

```typescript
// All of these are valid:
html.div(parentElement, "Text content", [childElements]);
html.div("Text content", parentElement, [childElements]);
html.div([childElements], "Text content", parentElement);
```

**Parameter Types:**

-   `HTMLElement`: Automatically detected as parent element
-   `string`: Used as text content
-   `Array<HTMLElement>`: Used as child elements

### Available Elements

The framework supports all standard HTML elements:

-   **Text Content**: `p`, `h1`-`h6`, `span`, `strong`, `em`, `code`, `pre`, `blockquote`, etc.
-   **Interactive**: `button`, `input`, `textarea`, `select`, `option`, `label`, etc.
-   **Media**: `img`, `video`, `audio`, `canvas`, `picture`, `source`, etc.
-   **Semantic**: `article`, `section`, `nav`, `header`, `footer`, `aside`, `main`, etc.
-   **Tables**: `table`, `thead`, `tbody`, `tr`, `th`, `td`, `caption`, etc.
-   **Lists**: `ul`, `ol`, `li`, `dl`, `dt`, `dd`
-   **Forms**: `form`, `fieldset`, `legend`, `progress`, `meter`, `output`, etc.

## State Management

The framework provides reactive state management through signals with automatic dependency tracking.

### Creating Signals

```typescript
import { signal } from "squidbase";

// Create a signal with initial value
const count = signal(0);
const username = signal("");
const items = signal<string[]>([]);
```

### Using Signals

```typescript
// Get current value
console.log(count.get()); // 0

// Set new value
count.set(5);

// Subscribe to changes
count.subscribe((newValue) => {
    console.log(`Count changed to: ${newValue}`);
});
```

### Effects

Effects allow you to create reactive computations that automatically re-run when their dependencies change:

```typescript
import { effect } from "squidbase";

const name = signal("John");
const age = signal(25);

// Effect with automatic dependency tracking
effect(() => {
    console.log(`${name.get()} is ${age.get()} years old`);
});

// Effect with explicit dependencies
effect(() => {
    console.log("Name changed!");
}, [name]);
```

### Computed Values

Computed signals automatically derive their value from other signals:

```typescript
import { computed } from "squidbase";

const firstName = signal("John");
const lastName = signal("Doe");

const fullName = computed(() => `${firstName.get()} ${lastName.get()}`);

console.log(fullName.get()); // "John Doe"

// fullName automatically updates when firstName or lastName changes
firstName.set("Jane");
console.log(fullName.get()); // "Jane Doe"
```

### Reactive UI Example

```typescript
const counter = signal(0);
const display = html.p(`Count: ${counter.get()}`);

// Update UI reactively using effect
effect(() => {
    display.textContent = `Count: ${counter.get()}`;
});

const incrementBtn = html.button("Increment");
incrementBtn.addEventListener("click", () => {
    counter.set(counter.get() + 1);
});
```

## Styling

The framework provides CSS-in-JS functionality with automatic class name generation using the djb2 hashing algorithm.

### Basic Styling

```typescript
import { css } from "squidbase";

// Create styles
const buttonStyle = css({
    backgroundColor: "#007acc",
    color: "white",
    padding: "12px 24px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
});

// Apply to element
const button = html.button("Styled Button");
button.className = buttonStyle;
```

### Advanced Styling Features

```typescript
// Media queries (use @ prefix)
const responsiveStyle = css({
    padding: "16px",
    "@(max-width: 768px)": {
        padding: "8px",
        fontSize: "14px",
    },
});

// Pseudo-classes (use & prefix)
const interactiveStyle = css({
    backgroundColor: "#007acc",
    "&:hover": {
        backgroundColor: "#005fa3",
    },
    "&:active": {
        transform: "scale(0.98)",
    },
});

// CSS custom properties
const themeStyle = css({
    "--primary-color": "#007acc",
    "--secondary-color": "#f0f0f0",
    color: "var(--primary-color)",
});

// Important declarations
const importantStyle = css({
    color: "red !important",
    fontSize: "18px !important",
});
```

### CSS Features

-   **Automatic class name generation** using djb2 hashing algorithm (format: "gg" + hash)
-   **Media queries** with `@` prefix syntax
-   **Pseudo-classes** with `&` prefix syntax
-   **CSS custom properties** support
-   **camelCase to kebab-case** automatic conversion
-   **!important** support

## Routing

The framework includes a powerful client-side router with animations and route guards.

### Setting Up Routes

```typescript
import { Router, Routes } from "squidbase";

const routes: Routes = [
    {
        title: "Home",
        path: "/",
        component: () => createHomePage(),
    },
    {
        title: "About",
        path: "/about",
        component: () => createAboutPage(),
    },
    {
        title: "Contact",
        path: "/contact",
        component: () => import("./src/pages/contact.ts").then((m) => m.default),
    },
];

const appContainer = document.getElementById("app")!;
const router = new Router(routes, appContainer);
```

### Route Guards

```typescript
const protectedRoute = {
    title: "Dashboard",
    path: "/dashboard",
    component: () => createDashboard(),
    guards: {
        beforeEnter: async () => {
            // Check authentication
            return isUserAuthenticated();
        },
        beforeLeave: async () => {
            // Confirm navigation away
            return confirm("Are you sure you want to leave?");
        },
    },
};
```

### Route Animations

```typescript
const animatedRoute = {
    title: "Gallery",
    path: "/gallery",
    component: () => createGallery(),
    animation: {
        onEnter: "fade-in",
        onLeave: "fade-out",
        animationLength: 300,
    },
};
```

### Router Methods

```typescript
// Navigate programmatically
await router.open("/about");
await router.open("/contact", { userId: 123 });

// Get current route info
const currentPath = router.getCurrentPath();
const currentRoute = router.getCurrentRoute();

// Clean up
router.destroy();
```

### Router Features

-   **Browser history integration** with pushState/popState
-   **Route parameters** passed to component functions
-   **Lazy loading** support for dynamic imports
-   **Animation system** with CSS class application
-   **Route guards** for navigation control
-   **Automatic cleanup** on route changes

## Examples

### Complete Counter App

```typescript
import { html, signal, css, effect } from "squidbase";

function createCounter(parent: HTMLElement) {
    const count = signal(0);

    // Styles
    const containerStyle = css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "32px",
    });

    const buttonStyle = css({
        backgroundColor: "#007acc",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        "&:hover": {
            backgroundColor: "#005fa3",
        },
    });

    const countStyle = css({
        fontSize: "48px",
        fontWeight: "bold",
        color: "#333",
    });

    // Create UI
    const container = html.div(parent);
    container.className = containerStyle;

    const display = html.h1(`Count: ${count.get()}`, container);
    display.className = countStyle;

    const incrementBtn = html.button("Increment", container);
    incrementBtn.className = buttonStyle;

    const decrementBtn = html.button("Decrement", container);
    decrementBtn.className = buttonStyle;

    const resetBtn = html.button("Reset", container);
    resetBtn.className = buttonStyle;

    // Event handlers
    incrementBtn.addEventListener("click", () => {
        count.set(count.get() + 1);
    });

    decrementBtn.addEventListener("click", () => {
        count.set(count.get() - 1);
    });

    resetBtn.addEventListener("click", () => {
        count.set(0);
    });

    // Reactive updates using effect
    effect(() => {
        display.textContent = `Count: ${count.get()}`;
    });
}
```

### Contact Form with Validation

```typescript
import { html, signal, css, effect } from "squidbase";

function createContactForm(parent: HTMLElement) {
    // State
    const formData = {
        name: signal(""),
        email: signal(""),
        message: signal(""),
    };

    const errors = signal<Record<string, string>>({});

    // Styles
    const formStyle = css({
        maxWidth: "500px",
        margin: "0 auto",
        padding: "32px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
    });

    const fieldStyle = css({
        marginBottom: "16px",
    });

    const labelStyle = css({
        display: "block",
        marginBottom: "4px",
        fontWeight: "bold",
    });

    const inputStyle = css({
        width: "100%",
        padding: "8px 12px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "16px",
    });

    const errorStyle = css({
        color: "#e74c3c",
        fontSize: "14px",
        marginTop: "4px",
    });

    const buttonStyle = css({
        backgroundColor: "#27ae60",
        color: "white",
        border: "none",
        padding: "12px 32px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        "&:hover": {
            backgroundColor: "#229954",
        },
    });

    // Create form
    const form = html.form(parent);
    form.className = formStyle;

    const title = html.h2("Contact Us", form);

    // Name field
    const nameField = html.div(form);
    nameField.className = fieldStyle;

    const nameLabel = html.label("Name", nameField);
    nameLabel.className = labelStyle;

    const nameInput = html.input(nameField);
    nameInput.className = inputStyle;
    nameInput.type = "text";

    const nameError = html.div(nameField);
    nameError.className = errorStyle;

    // Email field
    const emailField = html.div(form);
    emailField.className = fieldStyle;

    const emailLabel = html.label("Email", emailField);
    emailLabel.className = labelStyle;

    const emailInput = html.input(emailField);
    emailInput.className = inputStyle;
    emailInput.type = "email";

    const emailError = html.div(emailField);
    emailError.className = errorStyle;

    // Message field
    const messageField = html.div(form);
    messageField.className = fieldStyle;

    const messageLabel = html.label("Message", messageField);
    messageLabel.className = labelStyle;

    const messageTextarea = html.textarea(messageField);
    messageTextarea.className = inputStyle;
    messageTextarea.rows = 4;

    const messageError = html.div(messageField);
    messageError.className = errorStyle;

    // Submit button
    const submitBtn = html.button("Send Message", form);
    submitBtn.className = buttonStyle;
    submitBtn.type = "submit";

    // Validation
    function validateForm(): boolean {
        const newErrors: Record<string, string> = {};

        if (!formData.name.get().trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.get().trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email.get())) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.message.get().trim()) {
            newErrors.message = "Message is required";
        }

        errors.set(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    // Event handlers
    nameInput.addEventListener("input", (e) => {
        formData.name.set((e.target as HTMLInputElement).value);
    });

    emailInput.addEventListener("input", (e) => {
        formData.email.set((e.target as HTMLInputElement).value);
    });

    messageTextarea.addEventListener("input", (e) => {
        formData.message.set((e.target as HTMLTextAreaElement).value);
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", {
                name: formData.name.get(),
                email: formData.email.get(),
                message: formData.message.get(),
            });
            alert("Message sent successfully!");
        }
    });

    // Reactive error display using effect
    effect(() => {
        const currentErrors = errors.get();
        nameError.textContent = currentErrors.name || "";
        emailError.textContent = currentErrors.email || "";
        messageError.textContent = currentErrors.message || "";
    });
}
```

### Multi-Page Application with Router

```typescript
import { html, css, Router, Routes } from "squidbase";

// Page components
function createHomePage() {
    const container = html.div();
    html.h1("Welcome Home", container);
    html.p("This is the home page", container);

    const navBtn = html.button("Go to About", container);
    navBtn.addEventListener("click", () => {
        router.open("/about");
    });

    return container;
}

function createAboutPage() {
    const container = html.div();
    html.h1("About Us", container);
    html.p("Learn more about our company", container);
    return container;
}

function createContactPage(params?: any) {
    const container = html.div();
    html.h1("Contact", container);
    if (params?.userId) {
        html.p(`User ID: ${params.userId}`, container);
    }
    return container;
}

// Routes configuration
const routes: Routes = [
    {
        title: "Home",
        path: "/",
        component: () => createHomePage(),
        animation: {
            onEnter: "slide-in-right",
            onLeave: "slide-out-left",
            animationLength: 300,
        },
    },
    {
        title: "About",
        path: "/about",
        component: () => createAboutPage(),
        guards: {
            beforeEnter: async () => {
                console.log("Entering about page");
                return true;
            },
        },
    },
    {
        title: "Contact",
        path: "/contact",
        component: (params) => createContactPage(params),
    },
];

// Initialize router
const appContainer = document.getElementById("app")!;
const router = new Router(routes, appContainer);

// Add CSS for animations
css({
    "@keyframes slideInRight": {
        from: { transform: "translateX(100%)" },
        to: { transform: "translateX(0)" },
    },
    "@keyframes slideOutLeft": {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(-100%)" },
    },
    ".slide-in-right": {
        animation: "slideInRight 0.3s ease-out",
    },
    ".slide-out-left": {
        animation: "slideOutLeft 0.3s ease-out",
    },
});
```

## API Reference

### Signal<T>

```typescript
interface Signal<T> {
    get(): T; // Returns current value
    set(value: T): void; // Sets new value and notifies subscribers
    subscribe(callback: Function): void; // Adds change listener
}
```

### State Functions

```typescript
function signal<T>(defaultValue: T): Signal<T>;
function effect(fn: Function, dependencies?: Array<Signal<any>>): void;
function computed<T>(computeFn: () => T): Signal<T>;
```

### Router

```typescript
class Router {
    constructor(routes: Routes, parent: HTMLElement);

    open(path: string, params?: Object): Promise<void>; // Navigate to route
    getCurrentPath(): string; // Get current path
    getCurrentRoute(): Route | undefined; // Get current route object
    destroy(): void; // Clean up event listeners
}
```

### Route Interface

```typescript
interface Route {
    title: string;
    path: string;
    component: (params?: any) => HTMLElement | Promise<(params?: any) => HTMLElement>;
    guards?: RouteGuards;
    animation?: RouteAnimations;
}

interface RouteGuards {
    beforeEnter?: () => Promise<boolean>;
    beforeLeave?: () => Promise<boolean>;
}

interface RouteAnimations {
    onEnter: string;
    onLeave: string;
    animationLength: number;
}
```

### CSS Function

```typescript
function css(styles: CSSObject, className?: string): string;
```

**CSSObject supports:**

-   Regular CSS properties (camelCase converted to kebab-case)
-   Media queries with `@` prefix
-   Pseudo-classes with `&` prefix
-   CSS custom properties with `--` prefix
-   `!important` declarations

### HTML Elements

All HTML element functions follow this pattern:

```typescript
html.tagName(...args: any[]): HTMLElementType
```

Where `args` can be any combination of:

-   `HTMLElement` (parent)
-   `string` (text content)
-   `Array<HTMLElement>` (children)

## Implementation Details

### Class Name Generation

-   Uses djb2 hashing algorithm for consistent class names
-   Format: "gg" + 6-character hash (base-36)
-   Prevents style conflicts and ensures uniqueness

### Automatic Dependency Tracking

-   Effects automatically track signal dependencies during execution
-   Uses global `currentEffect` stack for dependency detection
-   Computed signals re-run when dependencies change

### Router Behavior

-   Integrates with browser history API
-   Supports async route components and lazy loading
-   Animation classes are applied/removed automatically
-   Route guards can prevent navigation by returning `false`

This framework provides a lightweight, type-safe approach to building modern web applications with reactive state management and powerful styling capabilities.
