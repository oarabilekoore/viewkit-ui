import errors from "./errors.js";
/**
 * A secure router that supports route guards, 404 handling, lazy loading, and nested routes.
 *
 * This router provides the ability to manage navigation, dynamically match routes with parameters,
 * and load components lazily. It also allows for route guards to be added, and includes support
 * for nested routes and handling of 404 errors.
 *
 * @param {Array<Route>} routes - The initial list of routes to configure the router with.
 *
 * @returns {Object} An API for managing routes, guards, and navigation within the app.
 */
function Router(routes) {
    const guards = [];
    let params = null;
    let notFound = () => {
        return import("../components/pages/+notFound.js");
    };
    let currentRoute = null;
    const handleRouteChange = async () => {
        const path = window.location.pathname;
        const matchedRoute = matchRoute(path, routes);
        if (matchedRoute) {
            params = matchedRoute.params;
            for (const guard of guards) {
                if (!(await guard(matchedRoute))) {
                    console.warn("Navigation cancelled by guard.");
                    return;
                }
            }
            currentRoute = matchedRoute;
            await loadComponent(matchedRoute);
        }
        else {
            console.error(`Route not found for path: ${path}`);
        }
    };
    const matchRoute = (path, routes) => {
        for (const route of routes) {
            const { regex, keys } = pathToRegex(route.path);
            const match = path.match(regex);
            if (match) {
                const params = keys.reduce((acc, key, index) => {
                    acc[key] = match[index + 1];
                    return acc;
                }, {});
                if (route.children) {
                    const nestedRoute = matchRoute(path.replace(regex, ""), route.children);
                    if (nestedRoute) {
                        return { ...route, params, nested: nestedRoute };
                    }
                }
                return { ...route, params };
            }
        }
        return null;
    };
    const pathToRegex = (path) => {
        const keys = [];
        const regexString = path
            .replace(/:([\w]+)/g, (_, key) => {
            keys.push(key);
            return "([^\\/]+)";
        })
            .replace(/\//g, "\\/");
        return { regex: new RegExp(`^${regexString}$`), keys };
    };
    const loadComponent = async (route) => {
        let component = route.component;
        if (typeof component === "function") {
            const module = await component();
            component = module.default;
        }
        else if (component) {
            const container = document.querySelector("#app");
            const instance = component;
            if (!instance.element) {
                throw Error(`Router Error: Error 101\n` + errors[101]);
            }
            if (!container) {
                throw Error(`Router Error: Error 100\n` + errors[100]);
            }
            container.replaceChildren();
            container.appendChild(instance.element);
        }
        else {
            console.error(`Router Error: Error 102\n` + errors[102]);
        }
    };
    window.addEventListener("popstate", handleRouteChange);
    return {
        /**
         * Adds a guard function to the router that will be called before navigation.
         *
         * @param {(route: any) => boolean | Promise<boolean>} guardFn - The guard function that will be invoked on route changes.
         */
        addGuard(guardFn) {
            guards.push(guardFn);
        },
        /**
         * Adds a new route to the router.
         *
         * @param {string} path - The route path to match.
         * @param {() => Promise<{ default: any }>} component - The component to be loaded for the route.
         * @param {RouteOptions} options - Additional options for the route.
         */
        add(path, component, options = {}) {
            routes.push({ path, component, options });
        },
        /**
         * Registers a function to be called when the route is loaded.
         *
         * @param {string} route - The route path to match.
         * @param {(component: any) => void} fn - The function to be called when the route is loaded.
         */
        on(route, fn) {
            const matchedRoute = routes.find((r) => r.path === route);
            if (matchedRoute)
                matchedRoute.onLoad = fn;
        },
        /**
         * Navigates to the specified path, replacing dynamic route parameters with provided values.
         *
         * @param {string} path - The route path to navigate to.
         * @param {Record<string, string>} params - The parameters to replace in the route path.
         */
        open(path, params = {}) {
            const fullPath = path.replace(/:([\w]+)/g, (_, key) => {
                if (params[key] === undefined) {
                    console.error(`Parameter "${key}" not provided for path: ${path}`);
                    return `:${key}`;
                }
                return params[key];
            });
            history.pushState(null, "", fullPath);
            handleRouteChange();
        },
        /**
         * Navigates back in the browser history.
         */
        back() {
            history.back();
            history.scrollRestoration;
        },
        /**
         * Navigates forward in the browser history.
         */
        forward() {
            history.forward();
        },
    };
}
const pageRouter = function (routes) {
    //@ts-ignore
    return (globalThis.router = Router(routes));
};
export default pageRouter;
