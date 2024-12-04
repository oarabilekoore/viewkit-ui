import type { Route, MatchedRoute, RouteOptions } from "./types.js";

/*** A secure router with route guards, 404 handling, lazy loading, and nested routes support.*/
function PageRouter(routes: Array<Route>) {
    const guards: Array<(route: any) => boolean | Promise<boolean>> = [];
    let params: Record<string, string> | null = null;
    let notFound: (() => Promise<{ default: any }>) | null = null;
    let currentRoute: MatchedRoute | null = null;

    // Handle route changes
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
        } else if (notFound) {
            //@ts-ignore
            await loadComponent({ component: notFound });
        } else {
            console.error(`Route not found for path: ${path}`);
        }
    };

    // Match a route with dynamic parameters, including nested routes
    const matchRoute = (path: string, routes: Array<Route>): MatchedRoute | null => {
        for (const route of routes) {
            const { regex, keys } = pathToRegex(route.path);
            const match = path.match(regex);

            if (match) {
                const params = keys.reduce((acc, key, index) => {
                    acc[key] = match[index + 1];
                    return acc;
                }, {} as Record<string, string>);

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

    // Convert route path to a regular expression with dynamic parameters
    const pathToRegex = (path: string): { regex: RegExp; keys: string[] } => {
        const keys: string[] = [];
        const regexString = path
            .replace(/:([\w]+)/g, (_, key) => {
                keys.push(key);
                return "([^\\/]+)";
            })
            .replace(/\//g, "\\/");

        return { regex: new RegExp(`^${regexString}$`), keys };
    };

    // Load a route component, supporting lazy loading and nested routes
    const loadComponent = async (route: MatchedRoute): Promise<void> => {
        let component = route.component;

        if (typeof component === "function") {
            const module = await component();
            component = module.default;
        }

        if (component && typeof route.onLoad === "function") {
            route.onLoad(component);
        } else if (component) {
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
                        instance.routingInfo(params);
                    }

                    if (route.nested) {
                        await loadComponent(route.nested);
                    }
                } else {
                    console.error(`Imported Route Is Not A Valid Component: ${instance}`);
                }
            }
        }
    };

    // Public API
    return {
        install(app: any) {
            app.router = this;
            this.init();
        },
        addGuard(guardFn: (route: any) => boolean | Promise<boolean>) {
            guards.push(guardFn);
        },
        setNotFound(component: () => Promise<{ default: any }>) {
            notFound = component;
        },
        add(path: string, component: () => Promise<{ default: any }>, options: RouteOptions = {}) {
            routes.push({ path, component, options });
        },
        on(route: string, fn: (component: any) => void) {
            const matchedRoute = routes.find((r) => r.path === route);
            if (matchedRoute) matchedRoute.onLoad = fn;
        },
        navigate(path: string, params: Record<string, string> = {}) {
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
        init() {
            handleRouteChange();
            window.addEventListener("popstate", handleRouteChange);
        },
        back() {
            history.back();
        },
        forward() {
            history.forward();
        },
    };
}

export default PageRouter;
