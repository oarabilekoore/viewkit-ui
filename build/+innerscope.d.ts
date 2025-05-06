export interface ApplicationConfig {
    title: string;
    icon?: string;
    routes: PageRouterConfig;
    allowzoom?: boolean;
    statusbarcolor?: string;
    scrollbarvisibility?: "shown" | "hidden";
}
export declare type PageRouterConfig = {
    mode: "hash" | "history";
    routes: Routes;
};
export declare type Routes = {
    path: string;
    component: Function;
}[];
export declare class Application {
    root: HTMLElement;
    router_map: Map<string, Function> | null;
    page_routes: Routes | null;
    router_mode: string | null;
    page_index: number;
    constructor(config?: ApplicationConfig);
    setConfig(cfg: ApplicationConfig): void;
    onExit(Fn: Function): void;
    onBack(Fn: Function): void;
    onStart(Fn: Function): void;
    onPause(Fn: Function): void;
    onResume(Fn: Function): void;
    onOffline(Fn: Function): void;
    onOnline(Fn: Function): void;
    onResize(Fn: Function): void;
    onScroll(Fn: Function): void;
    addRoute(route: string, Function: Function): void;
    openRoute(path: string): void;
    private hash_change_handler;
    private popstate_handler;
    private does_route_exist;
}
