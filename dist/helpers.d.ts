export declare const generateId: Function;
export declare const generateClassName: Function;
export type SystemTheme = "dark" | "light";
/**
 * Returns the system device theme; works in a browser environment.
 */
export declare const $pageTheme: () => SystemTheme;
/**
 * Attaches an event listener to the document body.
 */
export declare const $on: (event: string, handlerFn: EventListener | EventListenerObject) => void;
/**
 * Allows me to provide better debug info on errors and stop function execution
 */
export declare const debugInfo: (title: string, source: string, debugObject: object) => never;
