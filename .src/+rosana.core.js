/**
 * Returns the system device theme; works in a browser environment.
 * @typedef {"dark" | "light"} SystemTheme
 * @returns {SystemTheme} - The system's color scheme, either "dark" or "light".
 */
export const $pageTheme = function () {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches ? "dark" : "light";
};

/**
 * Attaches an event listener to the document body.
 * @param {string} event - The name of the event to listen for (e.g., 'click', 'keydown').
 * @param {EventListenerOrEventListenerObject} handlerFn - The event handler function.
 */
export const $on = function (event, handlerFn) {
    document.addEventListener(event, handlerFn);
};

/**
 * Creates and initializes the main application with a root component.
 * @param {Function} mainComponent - The main component function of the application.
 * @returns {Object} - The app instance with `mount` and `use` methods.
 */
export const $createApp = function (mainComponent) {
    const app = {
        _rootComponent: mainComponent,
        _plugins: [],

        /**
         * Mounts the main component to a DOM element identified by the selector.
         * @param {string} selector - A CSS selector for the container to mount the component.
         * @returns {Object} - The app instance for method chaining.
         */
        mount: function (selector) {
            const container = document.querySelector(selector);
            if (!container) {
                console.error(`No element found for selector "${selector}"`);
                return this; // Ensure the method still returns the app instance for chaining.
            }

            document.body.style.margin = "0";
            document.body.style.width = "100%";

            container.innerHTML = "";
            const instance = this._rootComponent;

            // Ensure the instance has an 'element' property before appending.
            // @ts-ignore
            if (instance && instance.element) {
                // @ts-ignore
                container.appendChild(instance.element);
            } else {
                console.error("Main component does not have an element property.");
            }

            return this;
        },

        /**
         * Adds a plugin to the application.
         * @param {Object} plugin - The plugin object to add, expected to have an _install function.
         * @returns {Object} - The app instance for method chaining.
         */
        use: function (plugin) {
            // @ts-ignore
            if (plugin && typeof plugin._install === "function") {
                // @ts-ignore
                plugin._install(this);
                // @ts-ignore
                this._plugins.push(plugin);
            } else {
                console.warn("Plugin is missing _install method:", plugin);
            }
            return this;
        },
    };
    return app;
};
