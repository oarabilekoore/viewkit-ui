/**
 * A secure router with route guards, 404 handling, lazy loading, and nested routes support.
 */
class $router {
    guards = [];
    params = null;
    routes = [];
    notFound = null;
    currentRoute = null;
    constructor(routes) {
        this.routes = routes;
        window.addEventListener("popstate", () => this._handleRouteChange());
    }
    /**
     * Attach the router to the app.
     */
    install(app) {
        app.router = this;
        this.init();
    }
    /**
     * Add route guard to validate route changes.
     */
    addGuard(guardFn) {
        this.guards.push(guardFn);
    }
    /**
     * Set a component for 404 (not found) pages.
     */
    setNotFound(component) {
        this.notFound = component;
    }
    /**
     * Define a new route, supporting nested routes.
     */
    add(path, component, options = {}) {
        this.routes.push({ path, component, options });
    }
    /**
     * Register a callback to trigger on route load.
     */
    on(route, fn) {
        const matchedRoute = this.routes.find((r) => r.path === route);
        if (matchedRoute)
            matchedRoute.onLoad = fn;
    }
    /**
     * Navigate to a specified route.
     */
    navigate(path, params = {}) {
        const fullPath = path.replace(/:([\w]+)/g, (_, key) => {
            if (params[key] === undefined) {
                console.error(`Parameter "${key}" not provided for path: ${path}`);
                return `:${key}`;
            }
            return params[key];
        });
        history.pushState(null, "", fullPath);
        this._handleRouteChange();
    }
    /**
     * Initialize the router by handling the initial route.
     */
    init() {
        this._handleRouteChange();
    }
    /**
     * Handle route changes and apply guards.
     */
    async _handleRouteChange() {
        const path = window.location.pathname;
        const matchedRoute = this._matchRoute(path, this.routes);
        if (matchedRoute) {
            this.params = matchedRoute.params;
            for (const guard of this.guards) {
                if (!(await guard(matchedRoute))) {
                    console.warn("Navigation cancelled by guard.");
                    return;
                }
            }
            this.currentRoute = matchedRoute;
            await this._loadComponent(matchedRoute);
        }
        else if (this.notFound) {
            //@ts-ignore
            await this._loadComponent({ component: this.notFound });
        }
        else {
            console.error(`Route not found for path: ${path}`);
        }
    }
    /**
     * Match a route with dynamic parameters, including nested routes.
     */
    _matchRoute(path, routes) {
        for (const route of routes) {
            const { regex, keys } = this._pathToRegex(route.path);
            const match = path.match(regex);
            if (match) {
                const params = keys.reduce((acc, key, index) => {
                    acc[key] = match[index + 1];
                    return acc;
                }, {});
                if (route.children) {
                    const nestedRoute = this._matchRoute(path.replace(regex, ""), route.children);
                    if (nestedRoute) {
                        return { ...route, params, nested: nestedRoute };
                    }
                }
                return { ...route, params };
            }
        }
        return null;
    }
    /**
     * Convert route path to a regular expression with dynamic parameters.
     */
    _pathToRegex(path) {
        const keys = [];
        const regexString = path
            .replace(/:([\w]+)/g, (_, key) => {
            keys.push(key);
            return "([^\\/]+)";
        })
            .replace(/\//g, "\\/");
        return { regex: new RegExp(`^${regexString}$`), keys };
    }
    /**
     * Load a route component, supporting lazy loading and nested routes.
     */
    async _loadComponent(route) {
        let component = route.component;
        if (typeof component === "function") {
            const module = await component();
            component = module.default;
        }
        if (component && typeof route.onLoad === "function") {
            route.onLoad(component);
        }
        else if (component) {
            const container = document.querySelector("#app");
            if (container) {
                container.innerHTML = "";
                const instance = component;
                //@ts-ignore
                if (instance && instance.element) {
                    //@ts-ignore
                    container.appendChild(instance.element);
                    //@ts-ignore
                    if (typeof instance.routingInfo === "function") {
                        //@ts-ignore
                        instance.routingInfo(this.params);
                    }
                    if (route.nested) {
                        await this._loadComponent(route.nested);
                    }
                }
                else {
                    console.error(`Imported Route Is Not A Valid Component: ${instance}`);
                }
            }
        }
    }
    /**
     * Navigate back in history.
     */
    back() {
        history.back();
    }
    /**
     * Navigate forward in history.
     */
    forward() {
        history.forward();
    }
}
export { $router };
