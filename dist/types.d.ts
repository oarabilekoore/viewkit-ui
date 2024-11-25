export interface Component {
    ismounted: Boolean;
    element: HTMLElement;
    elementClasses: string[];
    alignment(options: string): this;
    Batch(props: Record<string, unknown>): this;
    Show(): this;
    Hide(): this;
    Gone(): this;
}
export interface Layout {
    AddChild(child: Component): this;
    DestroyChild(child: Component): this;
}
export type EasingFunction = (amount: number) => number;
export interface tweenProperties {
    easing: string;
    target: object;
    duration: number;
}
export interface Route {
    path: string;
    component: () => Promise<{
        default: any;
    }>;
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
