export type PageRouterConfig = {
    mode: "hash" | "history";
    routes: Routes;
};
export type Routes = {
    path: string;
    component: Function;
}[];

export class PageRouter {
    routeMap: Map<string, Function>;
    pageRoutes: Routes;
    rootPage: HTMLElement;
    routerMode: "hash" | "history";
    currentIndex: number = 0;

    constructor(rootPage: HTMLElement, configuration: PageRouterConfig) {
        this.routeMap = new Map();
        this.rootPage = rootPage;
        this.routerMode = configuration.mode;
        this.pageRoutes = configuration.routes;

        this.pageRoutes?.forEach((route) => {
            this.AddRoute(route.path, route.component);
        });

        // Initialize the current index based on the initial state
        this.currentIndex = window.history.state?.index || 0;

        // assign according to prefered router mode
        if (this.routerMode === "hash") {
            var route = window.location.hash.slice(1);
            window.onhashchange = (event) => {
                this.hash_change_handler(route);
            };
        } else if (this.routerMode === "history") {
            var route = window.location.pathname;

            window.onpopstate = (event) => {
                const newIndex = event.state?.index || 0;
                this.currentIndex = newIndex;
                this.popstate_handler(route, event);
            };
        }
    }

    AddRoute(route: string, Function: Function) {
        this.routeMap.set(route, Function);
    }

    Open(path: string) {
        if (!this.does_route_exist(path)) {
            path = "/404";
        }

        if (this.routerMode == "hash") {
            this.hash_change_handler(path);
        } else this.popstate_handler(path);
        console.log("Opening Page: " + path);
    }

    private does_route_exist(path: string) {
        return this.routeMap.has(path);
    }

    private hash_change_handler(route: string) {}

    private popstate_handler(route: string, event?: Event) {
        console.log("PopStateHandler Recieving: ", route);

        if (event) {
            console.log("PopStateEvent", event);
        }

        const component = this.routeMap.get(route);
        document.body.innerHTML = "";
        component ? component() : console.error();

        const newIndex = this.currentIndex + 1;

        this.currentIndex = newIndex;
        console.log(`Navigated to ${route}`);
        history.pushState({ index: newIndex }, "", route);
    }
}
