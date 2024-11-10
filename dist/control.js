import { optionsApi } from "./layouts.js";
import { cssParser } from "./parser.js";
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
     * @returns this
     */
    batch(props) {
        Object.entries(props).forEach(([key, value]) => {
            requestAnimationFrame(() => {
                if (this.element) {
                    this.element[key] = value;
                }
            });
        });
        return this;
    }
    /**
     * Add an event listener to the element.
     * @param {string} event - The event type.
     * @param {Function} handler - The event handler function.
     * @returns {this} - Returns the instance of the class for chaining.
     */
    on(event, handler) {
        this.element?.addEventListener(event, handler);
        this.eventListeners.push([event, handler]);
        return this;
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
        this.css({ visibility: "visible" });
    }
    /**
     * Hide the element
     */
    hide() {
        this.css({ visibility: "hidden" });
    }
    /**
     * Sets the display and visibility of the element.
     */
    gone() {
        this.css({
            display: "none !important",
            visibility: "hidden",
        });
    }
}
