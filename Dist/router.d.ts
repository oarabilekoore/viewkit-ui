import type { Route, RouteOptions } from "./global";
declare const pageRouter: (routes: Array<Route>) => {
    /**
     * Adds a guard function to the router that will be called before navigation.
     *
     * @param {(route: any) => boolean | Promise<boolean>} guardFn - The guard function that will be invoked on route changes.
     */
    addGuard(guardFn: (route: any) => boolean | Promise<boolean>): void;
    /**
     * Sets the component to be shown when a route is not found.
     *
     * @param {() => Promise<{ default: any }>} component - The 404 component to be shown when a route is not found.
     */
    setNotFound(component: () => Promise<{
        default: any;
    }>): void;
    /**
     * Adds a new route to the router.
     *
     * @param {string} path - The route path to match.
     * @param {() => Promise<{ default: any }>} component - The component to be loaded for the route.
     * @param {RouteOptions} options - Additional options for the route.
     */
    add(path: string, component: () => Promise<{
        default: any;
    }>, options?: RouteOptions): void;
    /**
     * Registers a function to be called when the route is loaded.
     *
     * @param {string} route - The route path to match.
     * @param {(component: any) => void} fn - The function to be called when the route is loaded.
     */
    on(route: string, fn: (component: any) => void): void;
    /**
     * Navigates to the specified path, replacing dynamic route parameters with provided values.
     *
     * @param {string} path - The route path to navigate to.
     * @param {Record<string, string>} params - The parameters to replace in the route path.
     */
    open(path: string, params?: Record<string, string>): void;
    /**
     * Navigates back in the browser history.
     */
    back(): void;
    /**
     * Navigates forward in the browser history.
     */
    forward(): void;
};
export default pageRouter;
