export interface RouterInterface {
    open(path: string, parameter?: Object): void;
}

export interface RouteGuards {
    beforeEnter?: () => Promise<boolean>;
    beforeLeave?: () => Promise<boolean>;
}

export type RouteAnimations = {
    onEnter: string;
    onLeave: string;
    animationLength: number;
};

export type Route = {
    title: string;
    path: string;
    component: (params?: any) => HTMLElement | Promise<(params?: any) => HTMLElement>;
    guards?: RouteGuards;
    animation?: RouteAnimations;
};

export type Routes = Route[];

export class Router implements RouterInterface {
    private parent: HTMLElement;
    private map: Map<string, Route>;
    private routes: Route[];
    private currentPath: string;
    private currentComponent: HTMLElement | null = null;

    constructor(routes: Routes, parent: HTMLElement) {
        this.parent = parent;
        this.routes = routes;
        this.map = new Map();

        for (const route of this.routes) {
            this.map.set(route.path, route);
        }

        this.currentPath = window.location.pathname;

        window.addEventListener("popstate", (event) => {
            this.handlePopState(window.location.pathname, event);
        });

        this.navigateToPath(this.currentPath);
    }

    private async handlePopState(path: string, event?: Event) {
        await this.navigateToPath(path, {}, false);
    }

    private async navigateToPath(path: string, params: object = {}, pushState: boolean = true) {
        // Check if route exists
        if (!this.map.has(path)) {
            console.error(`The route - ${path} does not exist.`);
            return;
        }

        const route = this.map.get(path)!;

        // Handle beforeLeave guard for current route
        if (this.currentComponent && this.currentPath) {
            const currentRoute = this.map.get(this.currentPath);
            if (currentRoute?.guards?.beforeLeave) {
                const canLeave = await currentRoute.guards.beforeLeave();
                if (!canLeave) {
                    return; // Prevent navigation
                }
            }
        }

        // Handle beforeEnter guard for new route
        if (route.guards?.beforeEnter) {
            const canEnter = await route.guards.beforeEnter();
            if (!canEnter) {
                return; // Prevent navigation
            }
        }

        let newComponent = await route.component(params);

        // if the component was provided as an import promise we resolve
        // this way.
        if (newComponent instanceof Function) {
            newComponent = newComponent(params);
        }

        // Handle exit animation for current component
        if (this.currentComponent && route.animation) {
            await this.animateOut(this.currentComponent, route.animation);
        }

        // Clear parent and add new component
        this.parent.innerHTML = "";
        this.currentComponent = newComponent;
        this.parent.appendChild(newComponent);

        // Handle enter animation for new component
        if (route.animation) {
            await this.animateIn(newComponent, route.animation);
        }

        // Update browser history and current path
        if (pushState && path !== this.currentPath) {
            window.history.pushState({ path }, route.title, path);
        }

        this.currentPath = path;
        document.title = route.title;
    }

    private async animateIn(element: HTMLElement, animation: RouteAnimations): Promise<void> {
        return new Promise((resolve) => {
            element.classList.add(animation.onEnter);
            setTimeout(() => {
                element.classList.remove(animation.onEnter);
                resolve();
            }, animation.animationLength);
        });
    }

    private async animateOut(element: HTMLElement, animation: RouteAnimations): Promise<void> {
        return new Promise((resolve) => {
            element.classList.add(animation.onLeave);
            setTimeout(() => {
                element.classList.remove(animation.onLeave);
                resolve();
            }, animation.animationLength);
        });
    }

    async open(path: string, parameter: Object = {}): Promise<void> {
        await this.navigateToPath(path, parameter, true);
    }

    getCurrentPath(): string {
        return this.currentPath;
    }

    getCurrentRoute(): Route | undefined {
        return this.map.get(this.currentPath);
    }

    destroy(): void {
        //@ts-ignore
        window.removeEventListener("popstate", this.handlePopState);
        if (this.currentComponent) {
            this.currentComponent.remove();
        }
    }
}
