const createUniqueIdGenerator = (prefix: string): Function => {
    let count = 0;
    return () => `${prefix}-${count++}`;
};

export const generateId = createUniqueIdGenerator("rosana-id");
export const generateClassName = createUniqueIdGenerator("rosana-class");

type SystemTheme = "dark" | "light";

/**
 * Returns the system device theme; works in a browser environment.
 */
export const $pageTheme = function (): SystemTheme {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches ? "dark" : "light";
};

/**
 * Attaches an event listener to the document body.
 */
export const $on = function (event: string, handlerFn: EventListener | EventListenerObject) {
    document.addEventListener(event, handlerFn);
};
