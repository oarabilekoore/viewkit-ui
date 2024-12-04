import type { Layout } from "./types";
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
declare const createApp: (mainComponent: Layout) => object;
export default createApp;
