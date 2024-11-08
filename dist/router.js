// @ts-nocheck
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
            }
            else
                this._handleHashChange();
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
                // @ts-ignore
                if (this.currentRoute && this.currentRoute.component) {
                    // @ts-ignore
                    container.appendChild(this.currentRoute.component.element);
                }
                else
                    console.error("No valid component found for route");
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
            }
            else
                console.error(`Route not found: ${hash}`);
        },
        /**
         * which route to head to.
         * @param {string} path
         * @returns
         */
        navigate: function (path) {
            // @ts-ignore
            const route = this.routes.find((r) => r.path === path);
            if (route) {
                // @ts-ignore
                this.currentRoute = route;
                window.location.hash = path;
                this._render();
            }
            else
                console.error(`Route not found: ${path}`);
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
