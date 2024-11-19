const createUniqueIdGenerator = (prefix) => {
    let count = 0;
    return () => `${prefix}-${count++}`;
};
export const generateId = createUniqueIdGenerator("rosana-id");
export const generateClassName = createUniqueIdGenerator("rosana-class");
/**
 * Returns the system device theme; works in a browser environment.
 */
export const $pageTheme = function () {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches ? "dark" : "light";
};
/**
 * Attaches an event listener to the document body.
 */
export const $on = function (event, handlerFn) {
    document.addEventListener(event, handlerFn);
};
/**
 * Allows me to provide better debug info on errors and stop function execution
 */
export const debugInfo = function (title, source, debugObject) {
    let template = `rosana.js Error : ${title}\n
    The Following Debug Info Has Been Provided By ${source}\n
    Is HTMLELement : ${debugObject instanceof HTMLElement}\n
    Object Keys : ${Object.keys(debugObject)}\n
    Object Values : ${Object.values(debugObject)}`;
    throw Error(template);
};
