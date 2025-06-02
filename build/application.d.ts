import { Parent } from "./types";
declare global {
    interface Window {
        _onStartLoaded?: boolean;
    }
}
export interface ApplicationConfig {
    title: string;
    icon?: string;
    routes?: PageRouterConfig;
    allowzoom?: boolean;
    statusbarcolor?: string;
    scrollbarvisibility?: "shown" | "hidden";
}
export type PageRouterConfig = {
    mode: "hash" | "history";
    routes: Routes;
};
export type Routes = {
    path: string;
    component: Function;
}[];
export declare class Application {
    root: HTMLElement;
    route_view: Parent | null;
    router_map: Map<string, Function> | null;
    page_routes: Routes | null;
    router_mode: string | null;
    page_index: number;
    constructor(config?: ApplicationConfig);
    setConfig(cfg: ApplicationConfig): void;
    onExit(Fn: Function): void;
    onBack(Fn: Function): void;
    onStart(Fn: Function): void;
    onResume(Fn: Function): void;
    onOffline(Fn: Function): void;
    onOnline(Fn: Function): void;
    onResize(Fn: Function): void;
    onScroll(Fn: Function): void;
    setRouteView(parent: Parent): void;
    addRoute(route: string, Function: Function): void;
    openRoute(path: string): void;
    private hash_change_handler;
    private popstate_handler;
    private does_route_exist;
}
