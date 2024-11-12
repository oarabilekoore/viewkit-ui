export function generateId(): string;
export function generateClassName(): string;
export function $pageTheme(): SystemTheme;
export function $on(event: string, handlerFn: EventListenerOrEventListenerObject): void;
/**
 * Returns the system device theme; works in a browser environment.
 */
export type SystemTheme = "dark" | "light";
