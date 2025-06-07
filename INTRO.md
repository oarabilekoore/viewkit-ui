# ViewKit-UI Documentation

## Overview

**viewkit-ui** is a type-safe, high-performance UI library with minimal overhead designed for building reactive applications. It provides a simple and intuitive API that's easy for beginners to adopt while offering powerful features for building scalable web applications without framework lock-in.

## Installation

### Package Managers

```bash
# Using npm
npm install viewkit-ui

# Using bun
bun install viewkit-ui
```

## Core Concepts

### 1. HTML Elements (`html`)

ViewKit-UI provides a comprehensive set of HTML element creators through the `html` object. Each method creates a properly typed HTML element and accepts flexible parameters.

#### Parameter Patterns

All HTML element creators accept parameters in any order:

-   **Parent Element**: An existing HTMLElement to append the new element to
-   **Text Content**: A string to set as the element's text content
-   **Children Array**: An array of child elements to append

```typescript
import { html } from "viewkit-ui";

// Different ways to create elements
const button1 = html.Button("Click me"); // Just text
const button2 = html.Button(parentElement, "Click me"); // Parent and text
const container = html.Div(parentElement, [child1, child2]); // Parent and children
```

#### Available HTML Elements

**Text Content Elements:**

-   `Paragraph`, `Heading1`-`Heading6`, `Span`, `Emphasis`, `Strong`
-   `Code`, `Preformatted`, `Blockquote`, `Quote`, `Cite`
-   `Definition`, `Abbreviation`, `Time`, `Variable`
-   `SampleOutput`, `KeyboardInput`, `Subscript`, `Superscript`
-   `SmallText`, `MarkedText`, `DeletedText`, `InsertedText`

**Interactive Elements:**

-   `Button`, `TextInput`, `Checkbox`, `Radio`, `Range`
-   `FileInput`, `SubmitButton`, `ResetButton`, `ColorPicker`
-   `DatePicker`, `DateTimePicker`, `EmailInput`, `NumberInput`
-   `PasswordInput`, `SearchInput`, `TelInput`, `UrlInput`
-   `TextArea`, `Select`, `Option`, `Label`
-   `Fieldset`, `Legend`, `Progress`, `Meter`, `Output`

**Media Elements:**

-   `Image`, `Video`, `Audio`, `Canvas`, `Picture`
-   `Source`, `Track`, `Embed`, `ObjectEmbed`, `IFrame`
-   `HtmlMap`, `Area`

**Layout & Semantic Elements:**

-   `Article`, `Section`, `Nav`, `Header`, `Footer`
-   `Aside`, `Main`, `Figure`, `Figcaption`, `Details`
-   `Summary`, `Dialog`, `Menu`, `MenuItem`, `Div`

**Table Elements:**

-   `Table`, `TableHead`, `TableBody`, `TableRow`
-   `TableHeader`, `TableData`, `TableCaption`, `ColGroup`, `Col`

**List Elements:**

-   `OrderedList`, `UnorderedList`, `ListItem`
-   `DescriptionList`, `DescriptionTerm`, `DescriptionDetail`

### 2. Reactive State Management (`signal`)

ViewKit-UI includes a built-in reactive state management system using signals.

```typescript
import { signal } from "viewkit-ui";

// Create a signal with initial value
const count = signal(0);

// Get current value
console.log(count.get()); // 0

// Set new value (triggers subscribers)
count.set(10);

// Subscribe to changes
count.subscribe((newValue) => {
    console.log(`Count changed to: ${newValue}`);
});
```

#### Signal API

-   `get()`: Returns the current value
-   `set(newValue)`: Updates the value and notifies subscribers
-   `subscribe(callback)`: Registers a callback function to be called when the value changes

### 3. CSS-in-JS Styling (`css`)

ViewKit-UI provides a powerful CSS-in-JS solution with support for pseudo-classes, media queries, and automatic class name generation.

```typescript
import { css } from "viewkit-ui";

// Basic styling
const buttonStyle = css({
    padding: "12px 24px",
    fontSize: "1.2rem",
    backgroundColor: "#007acc",
    color: "white",
    borderRadius: "4px",
});

// Apply the style
element.classList.add(buttonStyle);

// Pseudo-classes
const hoverStyle = css({
    backgroundColor: "#007acc",
    "&:hover": {
        backgroundColor: "#005a99",
        transform: "scale(1.05)",
    },
});

// Media queries
const responsiveStyle = css({
    padding: "16px",
    "@(max-width: 768px)": {
        padding: "8px",
        fontSize: "14px",
    },
});

// Custom class names
const customStyle = css(
    {
        color: "red",
    },
    "my-custom-class"
);
```

#### CSS Features

-   **Automatic Class Generation**: Uses djb2 hashing algorithm for consistent class names
-   **Pseudo-classes**: Use `&:hover`, `&:focus`, `&:active`, etc.
-   **Media Queries**: Use `@(condition)` syntax
-   **Important Declarations**: Add `!important` to any value
-   **Custom Properties**: CSS variables using `--variable-name`
-   **Camel Case to Kebab Case**: Automatic conversion (e.g., `backgroundColor` → `background-color`)

### 4. Utility Classes

ViewKit-UI provides pre-defined utility classes for common styling patterns:

#### Layout Classes

-   `top_to_bottom`: Flex column layout
-   `bottom_to_top`: Flex column with items aligned to bottom
-   `left_to_right`: Flex row layout
-   `right_to_left`: Flex row with items aligned to right

#### Alignment Classes

-   `center`: Center both horizontally and vertically
-   `vcenter`: Center vertically
-   `hcenter`: Center horizontally

#### Sizing Classes

-   `fillxy`: Fill both width and height (100dvw × 100dvh)
-   `fillx`: Fill width (100%)
-   `filly`: Fill height (100%)
-   `inherit`: Inherit parent dimensions

#### Scrolling Classes

-   `scrollxy`: Enable scrolling in both directions
-   `scrollx`: Enable horizontal scrolling only
-   `scrolly`: Enable vertical scrolling only
-   `noscrollbar`: Hide scrollbars

#### Visibility Classes

-   `show`: Make element visible
-   `hide`: Hide element (visibility: hidden)
-   `gone`: Remove element from layout (display: none)

#### Layout System Classes

-   `layout-linear`: Linear layout (inline-flex, column)
-   `layout-absolute`: Absolute positioning
-   `layout-grid`: Grid layout

### 5. Router System

ViewKit-UI includes a complete client-side routing solution with guards, animations, and parameter passing.

```typescript
import { Router, Routes } from "viewkit-ui";

// Define routes
const routes: Routes = [
    {
        title: "Home",
        path: "/",
        component: () => createHomePage(),
        guards: {
            beforeEnter: async () => {
                // Check authentication, etc.
                return true;
            },
        },
    },
    {
        title: "About",
        path: "/about",
        component: () => createAboutPage(),
        animation: {
            onEnter: "fade-in",
            onLeave: "fade-out",
            animationLength: 300,
        },
    },
];

// Initialize router
const router = new Router(routes, document.getElementById("app"));

// Navigate programmatically
router.open("/about", { userId: 123 });

// Get current route info
const currentPath = router.getCurrentPath();
const currentRoute = router.getCurrentRoute();
```

#### Route Configuration

```typescript
type Route = {
    title: string; // Page title
    path: string; // URL path
    component: (params?) => HTMLElement | Promise<HTMLElement>; // Component function
    guards?: {
        // Optional route guards
        beforeEnter?: () => Promise<boolean>;
        beforeLeave?: () => Promise<boolean>;
    };
    animation?: {
        // Optional animations
        onEnter: string; // CSS class for enter animation
        onLeave: string; // CSS class for leave animation
        animationLength: number; // Animation duration in ms
    };
};
```

### 6. Helper Functions

#### showIF Function

Conditionally show/hide elements:

```typescript
import { showIF } from "viewkit-ui";

const element = html.Div("Content");
const isLoggedIn = signal(false);

// Show element only when user is logged in
isLoggedIn.subscribe((loggedIn) => {
    showIF(element, loggedIn);
});
```

## Complete Examples

### Counter App

```typescript
import { html, signal, css } from "viewkit-ui";

export function createCounter(parent) {
    const count = signal(0);

    const container = html.LinearLayout(parent);
    container.classList.add("center", "top_to_bottom");
    container.style.padding = "32px";

    // Display
    const display = html.Heading2(`Count: ${count.get()}`, container);
    display.style.marginBottom = "24px";

    // Buttons container
    const buttons = html.LinearLayout(container);
    buttons.LayoutDirection = "LEFT_TO_RIGHT";
    buttons.ElementAlignment = "CENTER";
    buttons.DomElement.style.gap = "16px";

    // Decrement button
    const decrementBtn = html.Button("-", buttons);
    decrementBtn.addEventListener("click", () => {
        count.set(count.get() - 1);
    });

    // Increment button
    const incrementBtn = html.Button("+", buttons);
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

### Contact Form

```typescript
import { html, signal } from "viewkit-ui";

function createContactForm(parent) {
    const formData = {
        name: signal(""),
        email: signal(""),
        message: signal(""),
    };

    const form = html.Form(parent);
    form.style.maxWidth = "500px";
    form.style.margin = "0 auto";
    form.style.padding = "32px";

    // Name field
    const nameLabel = html.Label("Name:", form);
    const nameInput = html.TextInput(form);
    nameInput.placeholder = "Enter your name";
    nameInput.addEventListener("input", (e) => {
        formData.name.set(e.target.value);
    });

    // Email field
    const emailLabel = html.Label("Email:", form);
    const emailInput = html.EmailInput(form);
    emailInput.placeholder = "Enter your email";
    emailInput.addEventListener("input", (e) => {
        formData.email.set(e.target.value);
    });

    // Message field
    const messageLabel = html.Label("Message:", form);
    const messageInput = html.TextArea(form);
    messageInput.placeholder = "Enter your message";
    messageInput.rows = 5;
    messageInput.addEventListener("input", (e) => {
        formData.message.set(e.target.value);
    });

    // Submit button
    const submitBtn = html.Button("Send Message", form);
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

## Type Definitions

ViewKit-UI includes comprehensive TypeScript definitions:

```typescript
// Layout and alignment types
type Layout_Direction = "TOP_TO_BOTTOM" | "BOTTOM_TO_TOP" | "LEFT_TO_RIGHT" | "RIGHT_TO_LEFT";
type Element_Alignment = "CENTER" | "LEFT" | "BOTTOM" | "RIGHT" | "VCENTER" | "HCENTER";
type Scroll_Direction = "HORIZONTAL" | "VERTICAL" | "BOTH";
type Parent_Fill = "FILLXY" | "FILLX" | "FILLY" | "INHERIT";

// Signal type
type Signal<T> = {
    get: () => T;
    set: (new_value: T) => void;
    subscribe: (fn: Function) => void;
};

// Router interfaces
interface RouterInterface {
    open(path: string, parameter?: Object): void;
}

interface RouteGuards {
    beforeEnter?: () => Promise<boolean>;
    beforeLeave?: () => Promise<boolean>;
}
```

## Best Practices

1. **Use Signals for State**: Leverage the built-in signal system for reactive state management
2. **Compose Components**: Break your UI into reusable component functions
3. **Utilize Utility Classes**: Use the provided utility classes for common styling patterns
4. **Type Safety**: Take advantage of the full TypeScript support for better development experience
5. **Route Guards**: Use route guards for authentication and navigation control
6. **Responsive Design**: Use media queries in the CSS function for responsive layouts

## Advanced Features

### Custom Element Creation

You can extend the library by creating custom element generators:

```typescript
import { genericElement } from "viewkit-ui";

// Create custom elements
const CustomWidget = genericElement<HTMLDivElement>("div");
const widget = CustomWidget("Custom content");
```

### Animation Integration

The router supports CSS animations. Define your animation classes:

```css
.fade-in {
    animation: fadeIn 0.3s ease-in-out;
}

.fade-out {
    animation: fadeOut 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make changes and commit (`git commit -am 'Add new feature'`)
4. Push to your fork (`git push origin feature-branch`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
