import type { Component, Signal, Unit } from "./types.js";
import signal from "./signal.js";

// This Map takes in an elements id and its handler Function, It will
// monitor all clicks on the page and check if the target maps to the
// element, great as it reduces eventListeners = reduces memory usage
export const onclickEventHandlerMap = new Map<string, Function>();

document.body.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target?.id && onclickEventHandlerMap.has(target.id)) {
        onclickEventHandlerMap.get(target.id)?.();
    }
});

/**
 * This class manages all the properties of controls.
 * If an element is not initialized, it defaults to creating its own
 * HTML element, typically a `<div>`.
 *
 * @class ComponentProperties
 * @description
 * The `ComponentProperties` class ensures that all controls have the necessary
 * properties and provides a fallback mechanism to create a `<div>`
 * when an element is not explicitly defined.
 */

export class ComponentProperties implements Component {
    isMounted: Signal<boolean>;
    element: HTMLElement;

    constructor() {
        this.element = document.createElement("div");
        this.isMounted = signal(true);
    }

    /** Call a function when the element is mounted to the DOM */
    set onMount(callback: () => void) {
        this.isMounted.subscribe((isMounted) => {
            if (isMounted) callback();
        });
    }

    /** Call a function when the element is unmounted from the DOM */
    set onUnMount(callback: () => void) {
        this.isMounted.subscribe((isMounted) => {
            if (!isMounted) callback();
        });
    }

    /** Call a function when this element is clicked */
    set onPress(handler: Function) {
        if (typeof handler !== "function") {
            throw new Error(`SetOnTouch expects a function but received: ${typeof handler}`);
        }
        onclickEventHandlerMap.set(this.element.id, handler);
    }

    /** Add scoped css to this element, as an Emotion like object or a template literal */
    Styled(className: string = ""): this {
        // If the DOMTokenList is empty jsut skip, if
        // not this will error out.
        if (className.length === 0) {
            //@ts-ignore
            return;
        }
        this.element.classList.add(className);
        return this;
    }

    /** Make the element visiblr */
    Show(): this {
        this.element.classList.remove("hide", "gone");
        this.element.classList.add("show");
        return this;
    }

    /** Hide the element visually */
    Hide(): this {
        this.element.classList.remove("show");
        this.element.classList.add("hide");
        return this;
    }

    /** Hide the element visually, and take no space in the DOM */
    Gone(): this {
        this.element.classList.remove("show", "hide");
        this.element.classList.add("gone");
        return this;
    }

    /** Helper method to process template literals */
    private interpolateTemplate(classnames: TemplateStringsArray, expressions: any[]): string {
        return classnames.reduce((result, part, i) => result + part + (expressions[i] || ""), "");
    }
}
