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
            if (instance && instance.element) {
                container.appendChild(instance.element);
            } else {
                console.error("Main component does not have an element property.");
            }

            // Initialize router if it's been added as a plugin
            if (this.router) {
                this.router.init();
            }

            return this;
        },

        /**
         * Adds a plugin to the application.
         * @param {Object} plugin - The plugin object to add, expected to have an install function.
         * @returns {Object} - The app instance for method chaining.
         */
        use: function (plugin) {
            if (plugin && typeof plugin.install === "function") {
                plugin.install(this);
                this._plugins.push(plugin);
            } else {
                console.warn("Plugin is missing install method:", plugin);
            }
            return this;
        },
    };

    return app;
};
