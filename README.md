<div align="center">
    <div>
    <img src="./ui-kit-logo.png">
    </div>
    <img alt="MIT Licensed" src="https://img.shields.io/badge/license-MIT-blue.svg">
    <img alt="Version Badge" src="https://img.shields.io/badge/version-1.0.0-brightgreen.svg">
</div>

<br>

---

> viewkit-ui is a type-safe, high-performance UI library with minimal overhead designed for building reactive applications, whilst being easy for beginners to adopt.

## ✨ Features

-   **🚀 Lightweight** - Minimal footprint with zero dependencies
-   **🔒 Type-Safe** - Full TypeScript support with comprehensive type definitions
-   **⚡ Reactive** - Signal-based state management for dynamic UIs
-   **🎨 CSS-in-JS** - Dynamic styling with auto-generated class names
-   **🧭 Router** - Client-side routing with animations and route guards
-   **📱 Responsive** - Built-in responsive design utilities
-   **🔧 Flexible** - Intuitive API that accepts parameters in any order

## Installation

To install the library, you can choose between npm, bun, or deno:

```bash
npm install viewkit-ui
bun install viewkit-ui
```

## Quick Start

```typescript
import { html, signal, css } from "viewkit-ui";

// Create reactive state
const count = signal(0);

// Create styled components
const buttonStyle = css({
    backgroundColor: "#007acc",
    color: "white",
    padding: "12px 24px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#005fa3",
    },
});

// Build your UI
const container = html.div();
const display = html.h1(`Count: ${count.get()}`, container);
const button = html.button("Increment", container);
button.className = buttonStyle;

// Add interactivity
button.addEventListener("click", () => {
    count.set(count.get() + 1);
});

// Reactive updates
count.subscribe((newCount) => {
    display.textContent = `Count: ${newCount}`;
});

document.body.appendChild(container);
```

## Core Concepts

### HTML Elements

Create type-safe DOM elements with flexible parameter ordering:

```typescript
// All of these work:
html.div(parentElement, "Text content", [childElements]);
html.div("Text content", parentElement);
html.button("Click me", container);
```

### Reactive State

Manage application state with signals:

```typescript
const username = signal("");
const items = signal<string[]>([]);

// Subscribe to changes
username.subscribe((name) => {
    console.log(`Hello, ${name}!`);
});
```

### Dynamic Styling

CSS-in-JS with advanced features:

```typescript
const responsiveCard = css({
    padding: "24px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    "@(max-width: 768px)": {
        padding: "16px",
    },
    "&:hover": {
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
});
```

### Client-Side Routing

Build SPAs with powerful routing:

```typescript
const routes = [
    {
        title: "Home",
        path: "/",
        component: () => createHomePage(),
        animation: {
            onEnter: "fade-in",
            onLeave: "fade-out",
            animationLength: 300,
        },
    },
];

const router = new Router(routes, document.getElementById("app"));
```

## What's New in v1.0.0

-   **🎉 Stable API** - Production-ready with semantic versioning
-   **📚 Complete Documentation** - Comprehensive guides and examples
-   **🔧 Improved TypeScript** - Better type inference and error messages
-   **⚡ Performance Optimizations** - Faster rendering and smaller bundle size
-   **🎨 Enhanced CSS-in-JS** - More styling features and better browser support
-   **🧭 Robust Router** - Route guards, animations, and better history management

## Documentation

You can find comprehensive documentation with examples and API reference [here](./INTRO.md).

### Quick Links

-   [Getting Started Guide](./INTRO.md#installation)
-   [HTML Elements](./INTRO.md#html-elements)
-   [State Management](./INTRO.md#state-management)
-   [Styling Guide](./INTRO.md#styling)
-   [Routing](./INTRO.md#routing)
-   [Examples](./INTRO.md#examples)

## Performance

Built for performance with:

-   Efficient DOM manipulation
-   Optimized CSS generation and caching
-   Small runtime overhead

## Community

-   📖 [Documentation](./INTRO.md)
-   🐛 [Issues](https://github.com/your-org/viewkit-ui/issues)
-   📦 [npm Package](https://www.npmjs.com/package/viewkit-ui)

## Contributing

Contributions are always welcome! We appreciate all forms of contribution.

### How to Contribute

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and add tests if applicable
4. **Commit your changes** (`git commit -am 'Add amazing feature'`)
5. **Push to your fork** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-org/viewkit-ui.git
cd viewkit-ui

# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build
```

Feel free to suggest new features, report bugs, or improve documentation.

## Roadmap

-   [ ] Server-side rendering support
-   [ ] DevTools extension
-   [ ] Component library expansion
-   [ ] Animation utilities
-   [ ] Form validation helpers
-   [x] Advanced state managment

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with ❤️ 
</div>
