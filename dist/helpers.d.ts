export declare const generateId: Function;
export declare const generateClassName: Function;
type SystemTheme = "dark" | "light";
/**
 * Returns the system device theme; works in a browser environment.
 */
export declare const $pageTheme: () => SystemTheme;
/**
 * Attaches an event listener to the document body.
 */
export declare const $on: (event: string, handlerFn: EventListener | EventListenerObject) => void;
export {};
