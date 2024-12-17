import signal from "./signal.js";
// This Map takes in an elements id and its handler Function, It will
// monitor all clicks on the page and check if the target maps to the
// element, great as it reduces eventListeners = reduces memory usage
export const onPressEventHanlerMap = new Map();
document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target?.id && onPressEventHanlerMap.has(target.id)) {
        onPressEventHanlerMap.get(target.id)?.();
    }
});
/**
 * This class manages all the properties of widgets.
 * If an element is not initialized, it defaults to creating its own
 * HTML element, typically a `<div>`.
 *
 * @class WidgetProperties
 * @description
 * The `WidgetProperties` class ensures that all widgets have the necessary
 * properties and provides a fallback mechanism to create a `<div>`
 * when an element is not explicitly defined.
 */
export class WidgetProperties {
    isMounted;
    element;
    constructor(tag = "div") {
        this.element = document.createElement(tag);
        this.isMounted = signal(true);
    }
    /** Call a function when the element is mounted to the DOM */
    set onMount(callback) {
        this.isMounted.subscribe((isMounted) => {
            if (isMounted)
                callback();
        });
    }
    /** Call a function when the element is unmounted from the DOM */
    set onUnMount(callback) {
        this.isMounted.subscribe((isMounted) => {
            if (!isMounted)
                callback();
        });
    }
    /** Call a function when this element is clicked */
    set onPress(handler) {
        if (typeof handler !== "function") {
            throw new Error(`SetOnTouch expects a function but received: ${typeof handler}`);
        }
        onPressEventHanlerMap.set(this.element.id, handler);
    }
}
