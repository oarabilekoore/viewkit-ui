/**
 * The `createApp` function initializes an application with a root component.
 * This is typically used to set up your homepage or main view.
 *
 * @function createApp
 * @param {Object} rootComponent - The root component of your application.
 *
 * @description
 * To mount the view or layout, use the `mountView` function.
 * Pass the id or class selector where the view will attach, e.g., `#app` or `.container`.
 *
 * The `createApp` function returns the following:
 *
 * - `usePlugin`:
 *   Allows you to import plugins and access them globally via the returned constant.
 *   Example usage:
 *   ```javascript
 *   const app = createApp(page).usePlugin(router);
 *   app.navigate(); // Access plugin methods globally
 *   ```
 *
 * - `onPause`:
 *   A setter function that triggers the provided callback when the app is sent to the background.
 *
 * - `onResume`:
 *   A setter function that triggers the provided callback when the app returns to the foreground.
 *
 * @returns {Object} An object containing:
 * - `usePlugin`: A function to register plugins.
 * - `onPause`: A function to register a callback for app background events.
 * - `onResume`: A function to register a callback for app foreground events.
 */
const createApp = function (mainComponent) {
    const app = {
        rootComponent: mainComponent,
        plugins: [],
        /*** Mounts the main component to a DOM element identified by the selector.*/
        mountView: function (selector) {
            const container = document.querySelector(selector);
            const instance = this.rootComponent;
            document.body.style.width = "100%";
            document.body.style.margin = "0";
            if (!container)
                console.error(`No element found for selector "${selector}"`);
            if (instance && instance.element && instance.type === "LAYOUT") {
                container.appendChild(instance.element);
            }
            else {
                console.error("View is not a rosana.js Component - Must be a Layout");
            }
            return this;
        },
        /** Adds a plugin to the application */
        usePlugin: function (plugin) {
            if (plugin && typeof plugin.install === "function") {
                //@ts-ignore
                plugin.install(this);
            }
            else {
                console.error("Plugin is missing install method:", plugin);
            }
            return this;
        },
        /** Call a function when the app is paused or placed in the background */
        set onPause(handler) { },
        /** Call a function when the app is resumed from incuring an onPause event */
        set onResume(handler) { },
    };
    return app;
};
export default createApp;
