export function $pageTheme(): SystemTheme;
export function $on(event: string, handlerFn: EventListenerOrEventListenerObject): void;
export function $createApp(mainComponent: Function): Object;
/**
 * Returns the system device theme; works in a browser environment.
 */
export type SystemTheme = "dark" | "light";
