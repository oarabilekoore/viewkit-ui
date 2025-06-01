const innerscope_version = "0.2.23";
console.log(`innerscope v${innerscope_version}`);
export class Application {
    root;
    router_map;
    page_routes;
    router_mode;
    page_index = 0;
    constructor(config) {
        this.router_map = new Map();
        this.page_routes = null;
        this.router_mode = null;
        this.root = document.body;
        config ? this.setConfig(config) : console.error("Application config Was Not Passed.");
    }
    setConfig(cfg) {
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
        }
        else if (this.router_mode === "history") {
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
            }
            else
                document.body.classList.add(`noscrollbar`);
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
    onExit(Fn) {
        window.addEventListener("beforeunload", (event) => {
            event.preventDefault();
            Fn(event);
        });
    }
    onBack(Fn) {
        window.addEventListener("popstate", (event) => {
            event.preventDefault();
            Fn(event);
        });
    }
    onStart(Fn) {
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
    onResume(Fn) {
        window.addEventListener("focus", (event) => {
            Fn(event);
        });
    }
    onOffline(Fn) {
        window.addEventListener("offline", (event) => {
            Fn(event);
        });
    }
    onOnline(Fn) {
        window.addEventListener("online", (event) => {
            Fn(event);
        });
    }
    onResize(Fn) {
        window.addEventListener("resize", (event) => {
            Fn(event);
        });
    }
    onScroll(Fn) {
        window.addEventListener("scroll", (event) => {
            Fn(event);
        });
    }
    addRoute(route, Function) {
        this.router_map?.set(route, Function);
    }
    openRoute(path) {
        if (!this.does_route_exist(path)) {
            path = "/404";
        }
        if (this.router_mode == "hash") {
            this.hash_change_handler(path);
        }
        else
            this.popstate_handler(path);
    }
    hash_change_handler(route) { }
    popstate_handler(route, event) {
        const component = this.router_map?.get(route);
        document.body.innerHTML = "";
        component ? component() : console.error();
        const newIndex = this.page_index + 1;
        this.page_index = newIndex;
        history.pushState({ index: newIndex }, "", route);
    }
    does_route_exist(path) {
        return this.router_map?.has(path);
    }
}
