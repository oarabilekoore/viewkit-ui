# viewkit-ui Documentation

A lightweight, modern TypeScript framework for building web applications with an intuitive, declarative API.

## Table of Contents

-   [Getting Started](#getting-started)
-   [Core Concepts](#core-concepts)
-   [Layouts](#layouts)
-   [Widgets](#widgets)
-   [Styling](#styling)
-   [State Management](#state-management)
-   [Examples](#examples)

## Getting Started

### Installation

```typescript
import { widget, css, signal } from "viewkit-ui";
```

### Basic Setup

```typescript
// Get your root element
const root = document.querySelector("body");

// Create your first layout
const page = widget.LinearLayout(root);
page.ParentFill = "FILLXY";
page.LayoutDirection = "TOP_TO_BOTTOM";
```

## Core Concepts

### Parents and Children

viewkit-ui uses a parent-child hierarchy where every element needs a parent to be attached to:

```typescript
// Parent is required for all widgets
const button = widget.Button("Click me", parentElement);
const text = widget.Paragraph("Hello World", parentElement);
```

### Layout System

The framework provides three main layout types:

-   **LinearLayout**: Flexible layout with directional flow
-   **ColumnLayout**: Vertical column layout (preset LinearLayout)
-   **GridLayout**: CSS Grid-based layout

## Layouts

### LinearLayout

The most versatile layout container:

```typescript
const container = widget.LinearLayout(parent);

// Configure layout direction
container.LayoutDirection = "TOP_TO_BOTTOM"; // or "BOTTOM_TO_TOP", "LEFT_TO_RIGHT", "RIGHT_TO_LEFT"

// Set alignment
container.ElementAlignment = "CENTER"; // or "LEFT", "RIGHT", "VCENTER", "HCENTER"

// Configure filling behavior
container.ParentFill = "FILLXY"; // or "FILLX", "FILLY", "INHERIT"

// Set scroll behavior
container.ScrollDirection = "VERTICAL"; // or "HORIZONTAL", "BOTH"
container.ScrollBarVisibility = "HIDDEN"; // or "SHOWN"
```

### ColumnLayout

Pre-configured vertical layout:

```typescript
const column = widget.ColumnLayout(parent);
// Automatically sets LayoutDirection to "TOP_TO_BOTTOM"
```

### GridLayout

CSS Grid-based layout:

```typescript
const grid = widget.GridLayout(parent);
grid.DomElement.style.gridTemplateColumns = "repeat(3, 1fr)";
grid.DomElement.style.gap = "16px";
```

## Widgets

### Text Content

```typescript
// Headings
const title = widget.Heading1("Main Title", parent);
const subtitle = widget.Heading2("Subtitle", parent);

// Paragraphs and text
const text = widget.Paragraph("Your content here", parent);
const emphasis = widget.Emphasis("Important text", parent);
const strong = widget.Strong("Bold text", parent);
const code = widget.Code("console.log('hello')", parent);
```

### Interactive Elements

```typescript
// Buttons
const button = widget.Button("Click Me", parent);
button.addEventListener("click", () => {
    console.log("Button clicked!");
});

// Input fields
const textInput = widget.TextInput(parent);
textInput.placeholder = "Enter text...";

const numberInput = widget.NumberInput(parent);
const emailInput = widget.EmailInput(parent);
const passwordInput = widget.PasswordInput(parent);

// Form elements
const form = widget.Form(parent);
const label = widget.Label("Username:", form);
const input = widget.TextInput(form);
```

### Media Elements

```typescript
// Images
const image = widget.Image(parent);
image.src = "path/to/image.jpg";
image.alt = "Description";

// Video
const video = widget.Video(parent);
video.src = "path/to/video.mp4";
video.controls = true;
```

### Lists

```typescript
const list = widget.UnorderedList(parent);
const item1 = widget.ListItem("First item", list);
const item2 = widget.ListItem("Second item", list);
```

## Styling

### CSS Function

Create dynamic styles with the `css` function:

```typescript
const buttonStyle = css({
    backgroundColor: "#007acc",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",

    // Pseudo-classes
    "&:hover": {
        backgroundColor: "#005a9e",
    },

    // Media queries
    "@media (max-width: 768px)": {
        padding: "8px 16px",
        fontSize: "0.9rem",
    },
});

// Apply the style
button.classList.add(buttonStyle);
```

### Built-in CSS Classes

viewkit-ui provides utility classes:

```typescript
// Visibility
element.classList.add("show"); // visible
element.classList.add("hide"); // hidden
element.classList.add("gone"); // display: none

// Layout directions
element.classList.add("top_to_bottom");
element.classList.add("left_to_right");
element.classList.add("center");
element.classList.add("vcenter");

// Filling
element.classList.add("fillxy"); // 100dvw x 100dvh
element.classList.add("fillx"); // 100% width
element.classList.add("filly"); // 100% height

// Scrolling
element.classList.add("scrollx");
element.classList.add("scrolly");
element.classList.add("noscrollbar");
```

### Direct Styling

Access the DOM element directly:

```typescript
const element = widget.Paragraph("Styled text", parent);
element.style.fontSize = "1.2rem";
element.style.color = "#ff6b6b";
element.style.marginBottom = "16px";
```

## State Management

### Signals

Create reactive state with signals:

```typescript
// Create a signal
const counter = signal(0);

// Get the current value
console.log(counter.get()); // 0

// Set a new value
counter.set(5);

// Subscribe to changes
counter.subscribe((newValue) => {
    console.log("Counter changed to:", newValue);
});

// Update UI based on state
const display = widget.Paragraph(`Count: ${counter.get()}`, parent);

counter.subscribe((newValue) => {
    display.textContent = `Count: ${newValue}`;
});
```

### Conditional Visibility

```typescript
import { showIF } from "viewkit-ui";

const isVisible = signal(true);
const element = widget.Paragraph("Toggle me!", parent);

// Show/hide based on condition
isVisible.subscribe((visible) => {
    showIF(element, visible);
});
```

## Examples

### Complete Landing Page

```typescript
import { widget, css } from "viewkit-ui";

const root = document.querySelector("body");

export function createLandingPage() {
    // Main page layout
    const page = widget.LinearLayout(root);
    page.ParentFill = "FILLXY";
    page.LayoutDirection = "TOP_TO_BOTTOM";
    page.ScrollDirection = "VERTICAL";
    page.ScrollBarVisibility = "HIDDEN";

    // Styling
    page.DomElement.style.backgroundColor = "#1e1e1e";
    page.DomElement.style.color = "#ffffff";
    page.DomElement.style.fontFamily = "Arial, sans-serif";

    // Hero section
    const hero = widget.LinearLayout(page);
    hero.ElementAlignment = "CENTER";
    hero.LayoutDirection = "TOP_TO_BOTTOM";
    hero.DomElement.style.padding = "64px 32px";
    hero.DomElement.style.textAlign = "center";

    const title = widget.Heading1("Welcome to viewkit-ui", hero);
    title.style.fontSize = "3rem";
    title.style.marginBottom = "16px";

    const subtitle = widget.Paragraph("Build beautiful web apps with TypeScript", hero);
    subtitle.style.fontSize = "1.2rem";
    subtitle.style.color = "#cccccc";

    // CTA Button
    const ctaButton = widget.Button("Get Started", hero);
    const buttonStyle = css({
        backgroundColor: "#007acc",
        color: "#ffffff",
        padding: "16px 32px",
        border: "none",
        borderRadius: "8px",
        fontSize: "1.1rem",
        cursor: "pointer",
        marginTop: "32px",
        "&:hover": {
            backgroundColor: "#005a9e",
        },
    });
    ctaButton.classList.add(buttonStyle);
}
```

### Interactive Counter App

```typescript
import { widget, signal, css } from "viewkit-ui";

function createCounter(parent) {
    const count = signal(0);

    const container = widget.LinearLayout(parent);
    container.ElementAlignment = "CENTER";
    container.LayoutDirection = "TOP_TO_BOTTOM";
    container.DomElement.style.padding = "32px";

    // Display
    const display = widget.Heading2(`Count: ${count.get()}`, container);
    display.style.marginBottom = "24px";

    // Buttons container
    const buttons = widget.LinearLayout(container);
    buttons.LayoutDirection = "LEFT_TO_RIGHT";
    buttons.ElementAlignment = "CENTER";
    buttons.DomElement.style.gap = "16px";

    // Decrement button
    const decrementBtn = widget.Button("-", buttons);
    decrementBtn.addEventListener("click", () => {
        count.set(count.get() - 1);
    });

    // Increment button
    const incrementBtn = widget.Button("+", buttons);
    incrementBtn.addEventListener("click", () => {
        count.set(count.get() + 1);
    });

    // Style buttons
    const buttonStyle = css({
        padding: "12px 24px",
        fontSize: "1.2rem",
        border: "2px solid #007acc",
        backgroundColor: "transparent",
        color: "#007acc",
        borderRadius: "4px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#007acc",
            color: "#ffffff",
        },
    });

    decrementBtn.classList.add(buttonStyle);
    incrementBtn.classList.add(buttonStyle);

    // Update display when count changes
    count.subscribe((newValue) => {
        display.textContent = `Count: ${newValue}`;
    });
}
```

### Form Example

```typescript
import { widget, signal } from "viewkit-ui";

function createContactForm(parent) {
    const formData = {
        name: signal(""),
        email: signal(""),
        message: signal(""),
    };

    const form = widget.Form(parent);
    form.style.maxWidth = "500px";
    form.style.margin = "0 auto";
    form.style.padding = "32px";

    // Name field
    const nameLabel = widget.Label("Name:", form);
    const nameInput = widget.TextInput(form);
    nameInput.placeholder = "Enter your name";
    nameInput.addEventListener("input", (e) => {
        formData.name.set(e.target.value);
    });

    // Email field
    const emailLabel = widget.Label("Email:", form);
    const emailInput = widget.EmailInput(form);
    emailInput.placeholder = "Enter your email";
    emailInput.addEventListener("input", (e) => {
        formData.email.set(e.target.value);
    });

    // Message field
    const messageLabel = widget.Label("Message:", form);
    const messageInput = widget.TextArea(form);
    messageInput.placeholder = "Enter your message";
    messageInput.rows = 5;
    messageInput.addEventListener("input", (e) => {
        formData.message.set(e.target.value);
    });

    // Submit button
    const submitBtn = widget.Button("Send Message", form);
    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log({
            name: formData.name.get(),
            email: formData.email.get(),
            message: formData.message.get(),
        });
    });

    // Style form elements
    [nameInput, emailInput, messageInput].forEach((input) => {
        input.style.width = "100%";
        input.style.padding = "12px";
        input.style.marginBottom = "16px";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "4px";
    });
}
```

## Best Practices

1. **Always provide a parent**: Every widget requires a parent element
2. **Use signals for reactive state**: Keep your UI in sync with data changes
3. **Leverage the css function**: Create reusable, dynamic styles
4. **Structure with layouts**: Use LinearLayout and GridLayout for organized interfaces
5. **Access DOM when needed**: Use `.DomElement` to access the underlying HTML element
6. **Handle events properly**: Add event listeners after creating elements

## API Reference

### Layout Properties

-   `LayoutDirection`: "TOP_TO_BOTTOM" | "BOTTOM_TO_TOP" | "LEFT_TO_RIGHT" | "RIGHT_TO_LEFT"
-   `ElementAlignment`: "CENTER" | "LEFT" | "BOTTOM" | "RIGHT" | "VCENTER" | "HCENTER"
-   `ParentFill`: "FILLXY" | "FILLX" | "FILLY" | "INHERIT"
-   `ScrollDirection`: "HORIZONTAL" | "VERTICAL" | "BOTH"
-   `ScrollBarVisibility`: "SHOWN" | "HIDDEN"

### Signal Methods

-   `signal.get()`: Get current value
-   `signal.set(value)`: Set new value
-   `signal.subscribe(callback)`: Listen for changes

### Utility Functions

-   `showIF(element, condition)`: Conditional visibility
-   `css(styles, className?)`: Dynamic CSS generation
