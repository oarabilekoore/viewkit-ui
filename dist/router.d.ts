import type { Route, RouteOptions } from "./types.js";
/*** A secure router with route guards, 404 handling, lazy loading, and nested routes support.*/
declare function router(routes: Array<Route>): {
    install(app: any): void;
    addGuard(guardFn: (route: any) => boolean | Promise<boolean>): void;
    setNotFound(component: () => Promise<{
        default: any;
    }>): void;
    add(path: string, component: () => Promise<{
        default: any;
    }>, options?: RouteOptions): void;
    on(route: string, fn: (component: any) => void): void;
    navigate(path: string, params?: Record<string, string>): void;
    init(): void;
    back(): void;
    forward(): void;
};
export default router;
