/**
 * The `BootstrapApplication` function initializes an application with a root component.
 * This is typically used to set up your homepage or main view.
 * @description
 * To mount the view or layout, use the `mountView` function.
 * Pass the id or class selector where the view will attach, e.g., `#app` or `.container`.
 */
const BootstrapApplication = function (mainComponent) {
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
    };
    return app;
};
export default BootstrapApplication;
