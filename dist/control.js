import { optionsApi } from "./layouts.js";
import { cssParser } from "./parser.js";
const eventHandlersMap = new Map();
document.body.addEventListener("click", (event) => {
    // @ts-ignore
    const targetId = event.target.id;
    if (eventHandlersMap.has(targetId)) {
        eventHandlersMap.get(targetId)();
    }
});
export class componentController {
    constructor() {
        /** @type {HTMLElement | null} */
        this.element = null;
        /** @type {Array<string>} */
        this.elementClasses = [];
        /** @type {Array<[string, Function]>} */
        this.eventListeners = [];
    }
    /**
     * Add a child element to this element.
     * @param {componentController} child - The child component to add.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    addChild(child) {
        if (child instanceof componentController && this.element) {
            // @ts-ignore
            this.element.appendChild(child.element);
        }
        else {
            console.error("Mounted Child Is Not A Rosana Component");
        }
        return this;
    }
    /**
     * Set the alignment of child elements in the control.
     * @param {string} options - Alignment options.
     */
    alignment(options) {
        if (options) {
            //@ts-ignore
            optionsApi(this.element, options);
        }
        else {
            console.log("Alignment Options Undefined");
        }
    }
    /**
     * batch dom api setters and getters effeciently
     * @param {object} props
     */
    batch(props) {
        Object.entries(props).forEach(([key, value]) => {
            requestAnimationFrame(() => {
                if (this.element) {
                    // @ts-ignore
                    this.element[key] = value;
                }
            });
        });
    }
    /**
     * Add an onclick event listener to the element.
     * @param {Function} handler - The event handler function.
     */
    set onclick(handler) {
        eventHandlersMap.set(this.element?.id, handler);
    }
    /**
     * Add css scoped styles to your element.
     * @param {TemplateStringsArray | object} styles
     * @returns {this}
     */
    css(styles) {
        const className = cssParser(styles);
        this.element?.classList.add(className);
        this.elementClasses.push(className);
        return this;
    }
    /**
     * Remove a child element from this element.
     * @param {componentController} child - The child component to remove.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    destroyChild(child) {
        if (child instanceof componentController) {
            child.eventListeners.forEach(([event, Fn]) => {
                // @ts-ignore
                child.element?.removeEventListener(event, Fn);
            });
            child.element?.remove();
        }
        else {
            console.error("Child Is Not A Rosana Component");
        }
        return this;
    }
    /**
     * Sets the visibility of the element.
     */
    show() {
        this.element?.classList.add("show");
    }
    /**
     * Hide the element
     */
    hide() {
        this.element?.classList.add("hide");
    }
    /**
     * Sets the display and visibility of the element.
     */
    gone() {
        this.element?.classList.add("gone");
    }
}
