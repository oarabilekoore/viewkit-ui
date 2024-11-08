// @ts-nocheck

/**
 * Hash-Based Router with Dynamic Route Parameter Support
 * @param {Array<Object>} hashParam
 */
export const $hashRouter = function (hashParam) {
    const plugin = {
        routes: hashParam,
        currentRoute: null,
        params: {},

        _init: function () {
            console.table(this.routes);
            window.addEventListener("hashchange", this._handleHashChange.bind(this));
            if (window.location.hash) {
                this._handleHashChange();
            } else {
                window.location.hash = "#/";
            }
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
            const appContainer = document.querySelector("#app");
            if (!appContainer) {
                console.error("App container not found.");
                return;
            }
            appContainer.innerHTML = "";

            if (this.currentRoute && this.currentRoute.component) {
                const component = this.currentRoute.component;
                appContainer.appendChild(component.element);

                // Pass params to the component if updateParams is defined
                if (typeof component.updateParams === "function") {
                    component.updateParams(this.params);
                }
            } else {
                console.error("No valid component found for route.");
            }
        },

        _handleHashChange: function () {
            const hash = window.location.hash.slice(1) || "/";

            // Find the matching route with support for dynamic parameters
            const matchedRoute = this._matchRoute(hash);

            if (matchedRoute) {
                this.currentRoute = matchedRoute.route;
                this.params = matchedRoute.params;
                this._render();
            } else {
                console.error(`Route not found: ${hash}`);
            }
        },

        _matchRoute(path) {
            // Loop through routes to find a match with parameters
            for (const route of this.routes) {
                const { regex, keys } = this._pathToRegex(route.path);
                const match = path.match(regex);

                if (match) {
                    const params = keys.reduce((acc, key, index) => {
                        acc[key] = match[index + 1];
                        return acc;
                    }, {});
                    return { route, params };
                }
            }
            return null;
        },

        _pathToRegex(path) {
            // Convert route path into regex and extract parameter keys
            const keys = [];
            const regexString = path
                .replace(/:([\w]+)/g, (_, key) => {
                    keys.push(key);
                    return "([^\\/]+)";
                })
                .replace(/\//g, "\\/");
            return { regex: new RegExp(`^${regexString}$`), keys };
        },

        /**
         * Navigate to a specified path with parameters
         * @param {string} path
         * @param {object} params
         */
        navigate(path, params = {}) {
            // Replace each :param in the path with the corresponding value from params
            const fullPath = path.replace(/:([\w]+)/g, (_, key) => {
                if (params[key] === undefined) {
                    console.error(`Parameter "${key}" not provided for path: ${path}`);
                    return `:${key}`; // Keeps the placeholder if parameter is missing
                }
                return params[key];
            });

            window.location.hash = fullPath;
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
