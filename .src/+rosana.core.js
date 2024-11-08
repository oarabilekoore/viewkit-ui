// rosana.js : A High Perfomance Framework
//             To Write Functional Ui,
//             Strongly Based on Signals.

"use strict";

export const $uiControl = class {
    constructor() {
        /** @type {HTMLElement | null} */
        this.element = null;

        /** @type {Array<string>} */
        this.elementClasses = [];

        /** @type {Array<[string, Function]>} */
        this.eventListeners = [];
    }

    /**
     * Add a child element to this element.
     * @param {$uiControl} child - The child component to add.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    addChild(child) {
        if (child instanceof $uiControl && this.element) {
            this.element.appendChild(child.element);
        } else {
            console.error("Mounted Child Is Not A Rosana Component");
        }
        return this;
    }

    /**
     * Set the alignment of child elements in the control.
     * @param {string} options - Alignment options.
     */
    set alignment(options) {
        if (options) {
            // @ts-ignore
            optionsApi(this.element, options);
        } else {
            console.log("Alignment Options Undefined");
        }
    }

    /**
     * batch dom api setters and getters effeciently
     * @param {object} props
     * @returns this
     */
    batch(props) {
        Object.entries(props).forEach(([key, value]) => {
            requestAnimationFrame(() => {
                if (this.element) {
                    this.element[key] = value;
                }
            });
        });
        return this;
    }

    /**
     * Add an event listener to the element.
     * @param {string} event - The event type.
     * @param {Function} handler - The event handler function.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    on(event, handler) {
        this.element?.addEventListener(event, handler);
        this.eventListeners.push([event, handler]);
        return this;
    }

    css(styles) {
        const className = cssParser(styles);
        this.element?.classList.add(className);
        this.elementClasses.push(className);
        return this;
    }

    /**
     * Remove a child element from this element.
     * @param {instanceOf<$uiControl>} child - The child component to remove.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    destroyChild(child) {
        if (child instanceof $uiControl) {
            child.eventListeners.forEach(([event, Fn]) => {
                child.element?.removeEventListener(event, Fn);
            });
            child.element?.remove();
        } else {
            console.error("Child Is Not A Rosana Component");
        }
        return this;
    }

    /**
     * Sets the visibility of the element.
     * @param {boolean} bool - Visibility state.
     */
    show() {
        this.css({ visibility: "visible" });
    }

    /**
     * Hide the element
     */
    hide() {
        this.css({ visibility: "hidden" });
    }

    /**
     * Sets the display and visibility of the element.
     * @param {boolean} bool - Visibility and space control state.
     */
    set gone(bool) {
        this.css({
            display: bool ? "none !important" : "block",
            visibility: bool ? "hidden" : "visible",
        });
    }
};

let idCount,
    classnameCount = 0;
function generateId() {
    return `rosana-id-${idCount++}`;
}

function generateClassName() {
    return `rosana-class-${classnameCount++}`;
}

/**
 * returns the system device theme, works in browser environment
 * @returns SystemTheme
 */
export const $sysTheme = function () {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
        return "dark";
    } else return "light";
};

/**
 * attach event listeners to the document body.
 * @param {HTMLEventListener} event
 * @param {Function} handlerFn
 */
export const $on = function (event, handlerFn) {
    document.addEventListener(event, handlerFn);
};

/**
 * Add CSS properties, works with both template literals
 * and objects (like Emotion in React).
 * Automatically detects the type of
 * input and returns a class name.
 *
 * @param {TemplateStringsArray | object} styles - CSS styles as either a template literal or an object.
 * @param {...any} values - Optional values for template literals.
 * @returns {string} ClassName - The generated class name.
 */

const cssParser = (styles, ...values) => {
    const className = generateClassName();
    const styleSheet = document.styleSheets[0];

    let cssString = "";

    let nestedCssRules = [];
    let mediaQueryRules = [];

    const parseStyles = (styles, selector) => {
        let baseStyles = "";
        Object.entries(styles).forEach(([key, value]) => {
            if (typeof value === "object") {
                if (key.startsWith("@")) {
                    mediaQueryRules.push({
                        media: key,
                        selector,
                        styles: value,
                    });
                } else if (key.startsWith("&:")) {
                    // Handle pseudo-classes prefixed with "&:"
                    const pseudoClass = key.replace("&", selector);
                    nestedCssRules.push({
                        selector: pseudoClass,
                        styles: value,
                    });
                } else {
                    // Handle other nested selectors
                    nestedCssRules.push({
                        selector: `${selector} ${key}`,
                        styles: value,
                    });
                }
            } else {
                baseStyles += `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}; `;
            }
        });
        return baseStyles;
    };

    // Check if 'styles' is a template literal or an object
    if (typeof styles === "object" && !Array.isArray(styles)) {
        // It's an object, so we parse it
        cssString = parseStyles(styles, `.${className}`);
    } else if (Array.isArray(styles)) {
        // It's a template literal, combine strings and values into CSS string
        cssString = styles.reduce((result, str, i) => {
            return result + str + (values[i] || "");
        }, "");
    }

    // Insert base class CSS rule
    if (cssString) {
        styleSheet.insertRule(`.${className} { ${cssString} }`, styleSheet.cssRules.length);
    }

    // Insert nested CSS rules
    nestedCssRules.forEach(({ selector, styles }) => {
        const nestedCssString = parseStyles(styles, selector);
        if (nestedCssString) {
            const rule = `${selector} { ${nestedCssString} }`;
            styleSheet.insertRule(rule, styleSheet.cssRules.length);
        }
    });

    // Insert media query rules
    mediaQueryRules.forEach(({ media, selector, styles }) => {
        const nestedCssString = parseStyles(styles, selector);
        if (nestedCssString) {
            const rule = `${media} { ${selector} { ${nestedCssString} } }`;
            styleSheet.insertRule(rule, styleSheet.cssRules.length);
        }
    });

    return className;
};

let viewOptions = [
    "noscrollbar",
    "scrollxy",
    "scrollx",
    "scrolly",
    "top",
    "bottom",
    "left",
    "right",
    "horizontal",
    "vertical",
    "vcenter",
    "center",
    "fillxy",
    "fillx",
    "filly",
];

/**
 *
 * @param {HTMLElement} element
 * @param {string} options
 */
const optionsApi = (element, options) => {
    const functions = {
        noscrollbar: () => {
            element.classList.add("noscrollbar");
        },

        fillxy: () => {
            let className = cssParser({
                width: "100%",
                height: window.innerHeight + "px",
            });
            element.classList.add(className);
        },

        fillx: () => {
            let className = cssParser({
                width: "100%",
            });
            element.classList.add(className);
        },

        filly: () => {
            let className = cssParser({
                height: window.innerHeight + "px",
            });
            element.classList.add(className);
        },

        scrollxy: () => {
            let className = cssParser({
                overflow: "auto",
            });
            element.classList.add(className);
        },
        scrollx: () => {
            let className = cssParser({
                overflowX: "auto",
            });
            element.classList.add(className);
        },
        scrolly: () => {
            let className = cssParser({
                overflowY: "auto",
            });
            element.classList.add(className);
        },
        left: () => {
            let className = cssParser({
                display: "flex",
                justifyContent: "flex-start",
            });
            element.classList.add(className);
        },
        right: () => {
            let className = cssParser({
                display: "flex",
                justifyContent: "flex-end",
            });
            element.classList.add(className);
        },
        center: () => {
            let className = cssParser({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            });
            element.classList.add(className);
        },
        vcenter: () => {
            let className = cssParser({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            });
            element.classList.add(className);
        },
        bottom: () => {
            let className = cssParser({
                display: "flex",
                alignItems: "flex-end",
            });
            element.classList.add(className);
        },
        top: () => {
            let className = cssParser({
                display: "flex",
                alignItems: "flex-start",
            });
            element.classList.add(className);
        },
        horizontal: () => {
            let className = cssParser({
                display: "flex",
                flexDirection: "row !important",
            });
            element.classList.add(className);
        },
        vertical: () => {
            let className = cssParser({
                display: "flex",
                flexDirection: "column",
            });
            element.classList.add(className);
        },
    };

    options
        .toLowerCase()
        .replace(/\s/g, "")
        .split(",")
        .forEach((el) => {
            if (viewOptions.includes(el)) {
                functions[el]();
            } else {
                console.error(`Unknown option: ${el}`);
            }
        });
};

/**
 * An internal api used by containers and elements, this
 * function adds css required for certain types of
 * layouts.
 * @param {HTMLElement} layout
 * @param {string} type
 * @param {string} options
 */
function layoutFitApi(layout, type, options) {
    options ? optionsApi(layout, options) : null;

    let layoutTYPE = type.toLowerCase();

    if (layoutTYPE == "linear") {
        let className = cssParser({
            display: "inline-flex",
            position: "relative !important",
            flexDirection: "column !important",
        });
        layout.classList.add(className);
    } else if (layoutTYPE == "absolute") {
        let className = cssParser({
            display: "flex",
        });
        layout.classList.add(className);
    } else console.error("Unknown Layout ", layout);
}

let $layoutInitializer = class extends $uiControl {
    constructor(type, options) {
        super();

        this.element = document.createElement("div");
        this.element.id = generateId();
        this.element.type = "Layout";

        type ? layoutFitApi(this.element, type, options) : null;
    }
};

let $componentInitalizer = class extends $uiControl {
    constructor(tag, parent, props) {
        super();
        /** @type {HTMLElement} */
        this.element = document.createElement(tag);
        this.element.id = generateId();

        Object.entries(props).forEach(([key, value]) => {
            requestAnimationFrame(() => {
                this.element[key] = value;
            });
        });

        if (parent instanceof $uiControl) {
            parent.addChild(this);
        } else {
            console.error("No Parent For Component To Attach To.");
            return;
        }
    }
};

/**
 * creates a layout, it takes in child components.
 * @param {string} type - The type of container (e.g., 'div', 'section').
 * @param {string} options - Alignment options
 * @returns {HTMLDivElement}
 */
export const $layout = function (type = "linear", options = "fillxy, vcenter") {
    return new $layoutInitializer(type, options);
};

/**
 * create a component
 * @param {HTMLElementTagNameMap} tag
 * @param {InstanceType<$uiControl>} parent
 * @param {Object} props
 */
export const $component = function (tag, parent, props = {}) {
    return new $componentInitalizer(tag, parent, props);
};

/**
 * This function is used to attach the main component
 * of your app, so as to mount plugins
 * @param {Function} mainComponent
 * @returns app
 */
export const $createApp = function (mainComponent) {
    const app = {
        _rootComponent: mainComponent,
        _plugins: [],

        /**
         * An Elements Id
         * The provided string is queried so that the
         * main component is appended to it.
         * @param {string} selector
         * @returns this
         */
        mount: function (selector) {
            const container = document.querySelector(selector);
            if (!container) {
                console.error(`No element found for selector "${selector}"`);
                return;
            }

            document.body.style.margin = "0";
            document.body.style.width = "100%";

            container.innerHTML = "";
            const instance = this._rootComponent;
            container.appendChild(instance.element);
            return this;
        },

        /**
         *
         * @param {Function} plugin
         * @returns this
         */
        use(plugin) {
            if (typeof plugin._install === "function") {
                plugin._install(this);
                this._plugins.push(plugin);
            }
            return this;
        },
    };
    return app;
};
