export interface Component {
    element: HTMLElement;
    alignment(options: string): this;
    Batch(props: Record<string, unknown>): this;
    SetOnTouch(handler: Function): this;
    Show(): this;
    Hide(): this;
    Gone(): this;
}

export interface LayoutComponent {
    AddChild(child: Component): this;
    DestroyChild(child: Component): this;
}

export interface Route {
    path: string;
    component: () => Promise<{ default: any }>;
    options?: RouteOptions;
    onLoad?: (component: any) => void;
    children?: Route[];
}

export interface MatchedRoute extends Route {
    params: Record<string, string>;
    nested?: MatchedRoute;
}

export interface RouteOptions {
    [key: string]: any;
}
