export interface rosanaComponent {
    ismounted: Boolean;
    element: HTMLElement;
    elementClasses: string[];
    addChild(child: rosanaComponent): this;
    alignment(options: string): this;
    batch(props: Record<string, unknown>): this;
    destroyChild(child: rosanaComponent): this;
    show(): this;
    hide(): this;
    gone(): this;
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
