# Framework Documentation

A lightweight TypeScript framework for building modern web applications with reactive state management, routing, and component-based architecture.

## Table of Contents

-   [Installation](#installation)
-   [Core Concepts](#core-concepts)
-   [HTML Elements](#html-elements)
-   [State Management](#state-management)
-   [Styling](#styling)
-   [Routing](#routing)
-   [Examples](#examples)

## Installation

```bash
# Import the library
import { html, signal, css, Router } from "viewkit-ui";
```

## Core Concepts

This framework provides a functional approach to building web applications with:

-   **HTML Element Creation**: Type-safe DOM element generation
-   **Reactive State**: Signal-based state management
-   **CSS-in-JS**: Dynamic styling with auto-generated class names
-   **Client-side Routing**: SPA routing with animations and guards

## HTML Elements

The `html` object provides methods to create all standard HTML elements with type safety.

### Basic Usage

```typescript
import { html } from "viewkit-ui";

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

### Available Elements

The framework supports all standard HTML elements:

-   **Text Content**: `p`, `h1`-`h6`, `span`, `strong`, `em`, `code`, etc.
-   **Interactive**: `button`, `input`, `textarea`, `select`, `option`, etc.
-   **Media**: `img`, `video`, `audio`, `canvas`, etc.
-   **Semantic**: `article`, `section`, `nav`, `header`, `footer`, etc.
-   **Tables**: `table`, `thead`, `tbody`, `tr`, `th`, `td`, etc.
-   **Lists**: `ul`, `ol`, `li`, `dl`, `dt`, `dd`
-   **Forms**: `form`, `fieldset`, `legend`, `label`, etc.

## State Management

The framework provides reactive state management through signals.

### Creating Signals

```typescript
import { signal } from "viewkit-ui";

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

### Reactive UI Example

```typescript
const counter = signal(0);
const display = html.p(`Count: ${counter.get()}`);

// Update UI when state changes
counter.subscribe((newCount) => {
    display.textContent = `Count: ${newCount}`;
});

const incrementBtn = html.button("Increment");
incrementBtn.addEventListener("click", {
    counter.set(counter.get() + 1);
});
```

## Styling

The framework provides CSS-in-JS functionality with automatic class name generation.

### Basic Styling

```typescript
import { css } from "viewkit-ui";

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
// Media queries
const responsiveStyle = css({
    padding: "16px",
    "@(max-width: 768px)": {
        padding: "8px",
        fontSize: "14px",
    },
});

// Pseudo-classes
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
```

### CSS Features

-   **Automatic class name generation** using djb2 hashing algorithm
-   **Media queries** with `@` prefix syntax
-   **Pseudo-classes** with `&` prefix syntax
-   **CSS custom properties** support
-   **camelCase to kebab-case** conversion
-   **!important** support

## Routing

The framework includes a powerful client-side router with animations and route guards.

### Setting Up Routes

```typescript
import { Router, Routes } from "viewkit-ui";

const routes: Routes = [
    {
        title: "Home",
        path: "/",
        component: createHomePage;
    },
    {
        title: "About",
        path: "/about",
        component: createAboutPage;
    },
    {
        title: "Contact",
        path: "/contact",
        component: () => import("./src/pages/contact.ts").then((m) => m.default),
    }
];

const appContainer = document.getElementById("app")!;
const router = new Router(routes, appContainer);
```

### Route Guards

```typescript
const protectedRoute = {
    title: "Dashboard",
    path: "/dashboard",
    component: createDashboard(),
    guards: {
        beforeEnter: async {
            // Check authentication
            return isUserAuthenticated();
        },
        beforeLeave: async {
            // Confirm navigation away
            return confirm("Are you sure you want to leave?");
        }
    }
};
```

### Route Animations

```typescript
const animatedRoute = {
    title: "Gallery",
    path: "/gallery",
    component: createGallery(),
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
router.open("/about");
router.open("/contact", { userId: 123 });

// Get current route info
const currentPath = router.getCurrentPath();
const currentRoute = router.getCurrentRoute();

// Clean up
router.destroy();
```

## Examples

### Complete Counter App

```typescript
import { html, signal, css } from "viewkit-ui";

function createCounter(parent: HTMLElement) {
    const count = signal(0);

    // Styles
    const containerStyle = css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "32px"
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
            backgroundColor: "#005fa3"
        }
    });

    const countStyle = css({
        fontSize: "48px",
        fontWeight: "bold",
        color: "#333"
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
    incrementBtn.addEventListener("click", {
        count.set(count.get() + 1);
    });

    decrementBtn.addEventListener("click", {
        count.set(count.get() - 1);
    });

    resetBtn.addEventListener("click", {
        count.set(0);
    });

    // Reactive updates
    count.subscribe((newCount) => {
        display.textContent = `Count: ${newCount}`;
    });
}
```

### Contact Form with Validation

```typescript
import { html, signal, css } from "viewkit-ui";

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

    // Error display
    errors.subscribe((newErrors) => {
        nameError.textContent = newErrors.name || "";
        emailError.textContent = newErrors.email || "";
        messageError.textContent = newErrors.message || "";
    });
}
```

### Multi-Page Application with Router

```typescript
import { html, css, Router, Routes } from "viewkit-ui";

// Page components
function createHomePage() {
    const container = html.div();
    html.h1("Welcome Home", container);
    html.p("This is the home page", container);

    const navBtn = html.button("Go to About", container);
    navBtn.addEventListener("click", {
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
        component: createHomePage(),
        animation: {
            onEnter: "slide-in-right",
            onLeave: "slide-out-left",
            animationLength: 300
        }
    },
    {
        title: "About",
        path: "/about",
        component: createAboutPage(),
        guards: {
            beforeEnter: async {
                console.log("Entering about page");
                return true;
            }
        }
    },
    {
        title: "Contact",
        path: "/contact",
        component: (params) => createContactPage(params)
    }
];

// Initialize router
const appContainer = document.getElementById("app")!;
const router = new Router(routes, appContainer);

// Add CSS for animations
css({
    ".slide-in-right": {
        animation: "slideInRight 0.3s ease-out"
    },
    ".slide-out-left": {
        animation: "slideOutLeft 0.3s ease-out"
    }
});
```

## API Reference

### Signal<T>

-   `get()`: Returns current value
-   `set(value: T)`: Sets new value and notifies subscribers
-   `subscribe(callback: Function)`: Adds change listener

### Router

-   `open(path: string, params?: Object)`: Navigate to route
-   `getCurrentPath()`: Get current path
-   `getCurrentRoute()`: Get current route object
-   `destroy()`: Clean up event listeners

### CSS Function

-   `css(styles: CSSObject, className?: string)`: Generate styles and return class name

This framework provides a lightweight, type-safe approach to building modern web applications with reactive state management and powerful styling capabilities.
