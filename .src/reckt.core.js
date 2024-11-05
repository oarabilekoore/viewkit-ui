// @ts-nocheck
// reckt.js : A High Perfomance Framework
//            To Write Functional Ui,
//            Strongly Based on Signals.

// @author
// Oarabile Koore

export class $uiControl {
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
     * @param {roseComponent} child - The child component to add.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    addChild(child) {
        if (child instanceof $uiControl && this.element) {
            this.element.appendChild(child.element);
        } else {
            console.error("Mounted Child Is Not A Reckt Component");
        }
        return this;
    }

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
            console.error("Child Is Not A Reckt Component");
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
    childrenMargins() {}
}

const defaultLanguage = navigator.language || navigator.userLanguage;
const defaultLangCode = defaultLanguage.split("-")[0];
let translations = {};
let currentLang;

export const $localize = async function (defaultLang = defaultLangCode, jsonSource) {
    currentLang = $signal(defaultLang);

    const response = await fetch(jsonSource);
    if (!response.ok) {
        console.log("Translation File Not Loaded");
        return;
    }

    const loadedTranslations = await response.json();
    translations = { ...translations, ...loadedTranslations };
};

export const $setLanguage = function (langCode) {
    currentLang.value = langCode;
};

let $localizedText = function (key, placeholders) {
    if (!currentLang || !currentLang.value) {
        return key;
    }

    const langData = translations[currentLang.value] || translations[defaultLangCode] || {};
    let translation = langData[key] || key;
    if (placeholders) {
        Object.keys(placeholders).forEach((placeholder) => {
            translation = translation.replace(`{${placeholder}}`, placeholders[placeholder]);
        });
    }
    return translation;
};

/**
 * Set the text accordingly to the languageCode and provided keys
 * @param {object} localizingFn
 * @param {string} key
 * @param {object} placeholders
 */
$uiControl.prototype.localizedText = async function (key, placeholders) {
    if (!currentLang || !currentLang.value) {
        return key;
    }

    const localizedText = await $localizedText(key, placeholders);

    this.element.textContent = localizedText;

    currentLang.subscribe(async (code) => {
        const localizedText = await $localizedText(key, placeholders);

        this.element.textContent = localizedText;
    });
};

let idCount = 0;
let classnameCount = 0;
function generateId() {
    return `rekct-id-${idCount++}`;
}

function generateClassName() {
    return `rekct-class-${classnameCount++}`;
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
 * showIF method allows you to hide or show an element if the restingParameter is truthy
 * @param {Boolean} restingParameter
 * @param {instanceOf<$uiControl>} onTruthyElement
 * @param {instanceOf<$uiControl>} onFalseyElement
 */
export const $showIF = function (restingParameter, onTruthyElement, onFalseyElement) {
    if (onTruthyElement === undefined || onFalseyElement === undefined) {
        $error(`showIF not called, one of the elements is undefined`);
        return;
    }
    restingParameter ? onTruthyElement.show() : onTruthyElement.hide();
    !restingParameter ? onFalseyElement.show() : onFalseyElement.hide();
};

/**
 * signal Method allows you to use plain signals, it takes in plain values and gives reactivity.
 * @param {any} defaultValue
 */
export const $signal = function (defaultValue = null) {
    let internal_variable = defaultValue;
    let subscriptions = [];

    /**
     * notify the user
     * @param {Function} fn
     */
    const notify = function (fn) {
        for (let subscriber of subscriptions) {
            subscriber(internal_variable);
        }
    };
    return {
        /**
         * set the signal's value
         * @param {any} val
         */
        set value(val) {
            internal_variable = val;
            notify();
        },

        /**
         * returns the signals value
         * @returns internal_variable
         */
        get value() {
            return internal_variable;
        },

        /**
         * subscribe to the signal
         * @param {Function} fn
         */
        subscribe: (fn) => {
            subscriptions.push(fn);
        },
    };
};

/**
 * add a signal that takes in the defaultValue as an object
 * @param {Object} initialValue = {}
 */
export const $store = function (initialValue = {}) {
    let state = { ...initialValue };
    const listeners = new Set();

    return {
        /**
         * set the signal's value
         * @param {any} val
         */
        set(key, value) {
            state[key] = value;
            listeners.forEach((listener) => listener(state));
        },

        /**
         * returns the signals value
         * @returns internal_variable
         */
        get(key) {
            return state[key];
        },

        /**
         * subscribe to the signal
         * @param {Function} fn
         */
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
};

/**
 * show a fallback view during an async operation, then swap it out when done.
 * @param {asyncFunction} resource
 * @param {instanceOf<ui.Control>} fallback
 * @param {instanceOf<ui.Control>} controlInSuspension
 */
export const $suspense = (resource, fallback, controlInSuspension) => {
    const subscriptions = [];

    const notify = () => subscriptions.forEach((subscriber) => subscriber());

    if (controlInSuspension.type === "Layout") {
        if (!controlInSuspension.hasChild(fallback)) {
            $error(`FallBack is not a child of ${controlInSuspension}`);
            return;
        }

        const fallback_id = fallback.id;
        const incremented_children_array = Object.keys(controlInSuspension.children)
            .map(Number)
            .map((childId) => childId + 1);

        const hideChildren = () => {
            incremented_children_array.forEach((child_id) => {
                if (child_id !== fallback_id) {
                    const element = document.getElementById("reckt-id-" + child_id);
                    if (element) element.style.display = "none";
                }
            });
        };

        const showChildren = () => {
            fallback.hide();
            incremented_children_array.forEach((child_id) => {
                if (child_id !== fallback_id) {
                    const element = document.getElementById("reckt-id-" + child_id);
                    if (element) element.style.display = "block";
                }
            });
        };

        hideChildren();

        Promise.resolve(resource())
            .then(() => {
                showChildren();
                notify();
            })
            .catch(() => hideChildren());
    } else {
        fallback.show();
        controlInSuspension.hide();

        Promise.resolve(resource())
            .then(() => {
                fallback.hide();
                controlInSuspension.show();
                notify();
            })
            .catch(() => {
                fallback.show();
                controlInSuspension.hide();
            });
    }

    return {
        /**
         * call a function after the new view is added
         * @param {Function} fn
         */
        effects: (fn) => subscriptions.push(fn),
    };
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

export const cssParser = (styles, ...values) => {
    const className = generateClassName();
    const styleSheet =
        document.styleSheets[0] ||
        document.head.appendChild(document.createElement("style")).sheet;

    let cssString = "";

    /**
     * @type {Array<any> | null}
     */
    let nestedCssRules = [];

    /**
     * @type {Array<any> | null}
     */
    let mediaQueryRules = [];

    /**
     * Parses a style object and generates a CSS string.
     * Handles nested selectors, pseudo-classes, and media queries.
     *
     * @param {object} styles - An object representing CSS properties and values.
     * @param {string} selector - The CSS selector to apply the styles to.
     * @returns {string} - A string representing the base CSS styles for the selector.
     */
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
                // @ts-ignore
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
 *
 * @param {HTMLElementTagNameMap} tag
 * @param {InstanceType<$uiControl>} parent
 * @param {Object} props
 */
export const $component = function (tag, parent, props = {}) {
    return new $componentInitalizer(tag, parent, props);
};

/**
 * Hash Based Router, Takes In Your Routes, Provided As a Dictionary
 * @param {Array<Object>} hashParam
 */

export const $hashRouter = function (hashParam) {
    const plugin = {
        routes: hashParam,
        currentRoute: null,

        _init: function () {
            if (!window.location.hash) {
                window.location.hash = `#index`;
            } else this._handleHashChange();

            window.onhashchange = this._handleHashChange.bind(this);
            return this;
        },

        /**
         * @param {any} app
         */
        _install: function (app) {
            this._init();
            app.router = this;
        },

        _render: function () {
            const container = document.querySelector("#app");
            if (container) {
                container.innerHTML = "";

                if (this.currentRoute && this.currentRoute.component) {
                    container.appendChild(this.currentRoute.component.element);
                } else console.error("No valid component found for route");
            }
            return this;
        },

        _handleHashChange: function () {
            const hash = window.location.hash.slice(1) || "/";
            // @ts-ignore
            const route = this.routes.find((r) => r.path === hash);

            if (route) {
                // @ts-ignore
                this.currentRoute = route;
                this._render();
            } else console.error(`Route not found: ${hash}`);
        },

        /**
         * which route to head to.
         * @param {string} path
         * @returns
         */
        navigate: function (path) {
            const route = this.routes.find((r) => r.path === path);
            if (route) {
                this.currentRoute = route;
                window.location.hash = path;
                this._render();
            } else console.error(`Route not found: ${path}`);

            return this;
        },

        back: function () {
            history.back();
        },

        forward: function () {
            history.forward();
        },
    };
    return plugin;
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
