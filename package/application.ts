import { Parent } from "./types";

const innerscope_version = "0.2.24";
console.log(`innerscope v${innerscope_version}`);

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

export class Application {
    root: HTMLElement;
    route_view: Parent | null;
    router_map: Map<string, Function> | null;
    page_routes: Routes | null;
    router_mode: string | null;
    page_index: number = 0;

    constructor(config?: ApplicationConfig) {
        this.router_map = new Map();
        this.page_routes = null;
        this.router_mode = null;
        this.route_view = null;
        this.root = document.body;

        config ? this.setConfig(config) : console.error("Application config Was Not Passed.");
    }

    setConfig(cfg: ApplicationConfig) {
        if (cfg.routes) {
            this.router_mode = cfg.routes.mode;
            this.page_routes = cfg.routes.routes;
        }

        this.page_index = window.history.state?.index || 0;

        if (this.router_mode === "hash") {
            var route = window.location.hash.slice(1);
            window.onhashchange = (event) => {
                this.hash_change_handler(route);
            };
        } else if (this.router_mode === "history") {
            var route = window.location.pathname;

            window.onpopstate = (event) => {
                const newIndex = event.state?.index || 0;
                this.page_index = newIndex;
                this.popstate_handler(route, event);
            };
        }

        this.page_routes?.forEach((route) => {
            this.addRoute(route.path, route.component);
        });

        if (cfg.title) {
            document.title = cfg.title;
        }

        if (cfg.statusbarcolor) {
            const meta = document.createElement("meta");
            meta.name = "theme-color";
            meta.content = cfg.statusbarcolor;
            document.head.appendChild(meta);
        }

        if (cfg.scrollbarvisibility) {
            if (cfg.scrollbarvisibility == "shown") {
                document.body.classList.remove(`noscrollbar`);
            } else document.body.classList.add(`noscrollbar`);
        }

        if (!cfg.allowzoom) {
            let meta = document.querySelector('meta[name="viewport"]');

            if (!meta) {
                meta = document.createElement("meta");
                //@ts-ignore
                meta.name = "viewport";
                document.head.appendChild(meta);
            }
            //@ts-ignore
            meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        }
    }

    onExit(Fn: Function) {
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            Fn(event);
        });
    }

    onBack(Fn: Function) {
        window.addEventListener("popstate", (event) => {
            event.preventDefault();
            Fn(event);
        });
    }

    onStart(Fn: Function) {
        // This check is done because vite will cause onStart
        // Function to be loaded twice, annoying for ui to be
        // Rendered Twice

        if (!("_onStartLoaded" in window)) {
            window._onStartLoaded = true;
            window.addEventListener("load", (event) => {
                Fn(event);
                console.log("OnStart Function Call");
            });
        }
    }

    onResume(Fn: Function) {
        window.addEventListener("focus", (event) => {
            Fn(event);
        });
    }

    onOffline(Fn: Function) {
        window.addEventListener("offline", (event) => {
            Fn(event);
        });
    }

    onOnline(Fn: Function) {
        window.addEventListener("online", (event) => {
            Fn(event);
        });
    }

    onResize(Fn: Function) {
        window.addEventListener("resize", (event) => {
            Fn(event);
        });
    }

    onScroll(Fn: Function) {
        window.addEventListener("scroll", (event) => {
            Fn(event);
        });
    }

    setRouteView(parent: Parent) {
        this.route_view = parent;
    }

    addRoute(route: string, Function: Function) {
        this.router_map?.set(route, Function);
    }

    openRoute(path: string) {
        if (!this.does_route_exist(path)) {
            path = "/404";
        }

        if (this.router_mode == "hash") {
            this.hash_change_handler(path);
        } else this.popstate_handler(path);
    }

    private hash_change_handler(route: string) {}

    private popstate_handler(route: string, event?: Event) {
        const component = this.router_map?.get(route);

        // Check If A RouteView Exist, If Not Change The Whole Doc
        if (this.route_view) {
            //@ts-ignore
            this.route_view.DomElement.innerHTML = "";
            console.log("Cleared Page");
            component ? this.route_view.appendChild(component()) : console.error();
            console.log("Added A New Page");
        } else {
            document.body.innerHTML = "";
            component ? component() : console.error();
        }
        const newIndex = this.page_index + 1;

        this.page_index = newIndex;
        history.pushState({ index: newIndex }, "", route);
    }

    private does_route_exist(path: string) {
        return this.router_map?.has(path);
    }
}
