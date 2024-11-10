/**
 * A secure router with route guards, 404 handling, lazy loading, and nested routes support.
 */
export class $router {
    /**
     * Initialize router with routes and listeners.
     * @param {Array<Object>} routes
     */
    constructor(routes: Array<Object>);
    guards: any[];
    params: any;
    routes: Object[];
    notFound: Function | null;
    currentRoute: Object | null;
    /**
     * Attach the router to the app.
     * @param {any} app
     */
    install(app: any): void;
    /**
     * Add route guard to validate route changes.
     * @param {Function} guardFn - Function returning a boolean or promise.
     */
    addGuard(guardFn: Function): void;
    /**
     * Set a component for 404 (not found) pages.
     * @param {Function} component
     */
    setNotFound(component: Function): void;
    /**
     * Define a new route, supporting nested routes.
     * @param {string} path - Path of the route.
     * @param {Function|Promise} component - Component or function for lazy loading.
     * @param {Object} [options] - Additional route options.
     */
    add(path: string, component: Function | Promise<any>, options?: Object | undefined): void;
    /**
     * Register a callback to trigger on route load.
     * @param {string} route - Route path.
     * @param {Function} fn - Callback function.
     */
    on(route: string, fn: Function): void;
    /**
     * Navigate to a specified route.
     * @param {string} path
     */
    navigate(path: string, params?: {}): void;
    /**
     * Initialize the router by handling the initial route.
     */
    init(): void;
    /**
     * Handle route changes and apply guards.
     */
    _handleRouteChange(): Promise<void>;
    /**
     * Match a route with dynamic parameters, including nested routes.
     * @param {string} path
     * @param {Array<Object>} routes - List of routes to match.
     * @returns {Object|null} - Matched route with parameters and nested route data.
     */
    _matchRoute(path: string, routes: Array<Object>): Object | null;
    /**
     * Convert route path to a regular expression with dynamic parameters.
     * @param {string} path
     * @returns {Object} - Regular expression and keys.
     */
    _pathToRegex(path: string): Object;
    /**
     * Load a route component, supporting lazy loading and nested routes.
     * @param {Object} route - Route to load.
     */
    _loadComponent(route: Object): Promise<void>;
    /**
     * Navigate back in history.
     */
    back(): void;
    /**
     * Navigate forward in history.
     */
    forward(): void;
}
