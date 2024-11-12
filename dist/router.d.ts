/**
 * A secure router with route guards, 404 handling, lazy loading, and nested routes support.
 */
declare class $router {
    private guards;
    private params;
    private routes;
    private notFound;
    private currentRoute;
    constructor(routes: Array<Route>);
    /**
     * Attach the router to the app.
     */
    install(app: any): void;
    /**
     * Add route guard to validate route changes.
     */
    addGuard(guardFn: (route: any) => boolean | Promise<boolean>): void;
    /**
     * Set a component for 404 (not found) pages.
     */
    setNotFound(component: () => Promise<{
        default: any;
    }>): void;
    /**
     * Define a new route, supporting nested routes.
     */
    add(path: string, component: () => Promise<{
        default: any;
    }>, options?: RouteOptions): void;
    /**
     * Register a callback to trigger on route load.
     */
    on(route: string, fn: (component: any) => void): void;
    /**
     * Navigate to a specified route.
     */
    navigate(path: string, params?: Record<string, string>): void;
    /**
     * Initialize the router by handling the initial route.
     */
    init(): void;
    /**
     * Handle route changes and apply guards.
     */
    private _handleRouteChange;
    /**
     * Match a route with dynamic parameters, including nested routes.
     */
    private _matchRoute;
    /**
     * Convert route path to a regular expression with dynamic parameters.
     */
    private _pathToRegex;
    /**
     * Load a route component, supporting lazy loading and nested routes.
     */
    private _loadComponent;
    /**
     * Navigate back in history.
     */
    back(): void;
    /**
     * Navigate forward in history.
     */
    forward(): void;
}
export { $router };
/**
 * Route type definition.
 */
interface Route {
    path: string;
    component: () => Promise<{
        default: any;
    }>;
    options?: RouteOptions;
    onLoad?: (component: any) => void;
    children?: Route[];
}
/**
 * Route options type definition.
 */
interface RouteOptions {
    [key: string]: any;
}
