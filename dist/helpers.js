/**@param {string} prefix */
const createUniqueIdGenerator = (prefix) => {
    let count = 0;
    return () => `${prefix}-${count++}`;
};
export const generateId = createUniqueIdGenerator("rosana-id");
export const generateClassName = createUniqueIdGenerator("rosana-class");
/**
 * Returns the system device theme; works in a browser environment.
 * @typedef {"dark" | "light"} SystemTheme
 * @returns {SystemTheme} - The system's color scheme, either "dark" or "light".
 */
export const $pageTheme = function () {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches ? "dark" : "light";
};
/**
 * Attaches an event listener to the document body.
 * @param {string} event - The name of the event to listen for (e.g., 'click', 'keydown').
 * @param {EventListenerOrEventListenerObject} handlerFn - The event handler function.
 */
export const $on = function (event, handlerFn) {
    document.addEventListener(event, handlerFn);
};
