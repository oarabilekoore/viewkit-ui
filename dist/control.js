import { optionsApi } from "./layouts.js";
import { cssParser } from "./parser.js";
const eventHandlersMap = new Map();
document.body.addEventListener("click", (event) => {
    //@ts-ignore
    const targetId = event.target.id;
    if (eventHandlersMap.has(targetId)) {
        eventHandlersMap.get(targetId)();
    }
});
export class componentController {
    element;
    elementClasses;
    constructor() {
        this.element = null;
        this.elementClasses = [];
    }
    /**
     * Add a child element to this element.
     */
    addChild(child) {
        if (child?.element == undefined) {
            console.warn(`The Passed Object Is Not An Rosana/Html Element :\n`);
            console.warn(`Properties of child: ${child}\n`);
            console.warn(`TypeOf : ${typeof child}`);
            return;
        }
        this.element.appendChild(child.element);
        return this;
    }
    /**
     * Set the alignment of child elements in the control
     */
    alignment(options) {
        if (!options) {
            console.warn(`Alignment Options Undefined At: ${this.element}`);
        }
        optionsApi(this.element, options);
        return this;
    }
    /**
     * batch dom api setters and getters effeciently
     */
    batch(props) {
        if (!props) {
            throw Error(`Null Batched Props For: ${this}`);
        }
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
     * Add an onclick event listener to the element.
     */
    set onclick(handler) {
        eventHandlersMap.set(this.element?.id, handler);
    }
    /**
     * Add css scoped styles to your element.
     */
    css(styles) {
        const className = cssParser(styles);
        this.element?.classList.add(className);
        this.elementClasses.push(className);
        return this;
    }
    /**
     * Remove a child element from this element.
     */
    destroyChild(child) {
        if (child instanceof componentController) {
            eventHandlersMap.delete(child.element?.id);
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
        return this;
    }
    /**
     * Hide the element
     */
    hide() {
        this.element?.classList.add("hide");
        return this;
    }
    /**
     * Sets the display and visibility of the element.
     */
    gone() {
        this.element?.classList.add("gone");
        return this;
    }
}
