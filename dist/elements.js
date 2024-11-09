import { componentController } from "./control.js";
import { generateId } from "./helpers.js";
/** @typedef {string} HtmlTag */
/**
 * Initializes an HTML element with specified properties and attaches it to a parent component.
 * @class
 * @extends componentController
 */
let $ElementInitializer = class extends componentController {
    /**
     * Creates an HTML element.
     * @param {HtmlTag} tag - The HTML tag name to create (e.g., 'div', 'span').
     * @param {componentController} parent - The parent component to attach to.
     * @param {Object<string, any>} props - An object containing properties to set on the element.
     */
    constructor(tag, parent, props) {
        super();
        this.element = document.createElement(tag);
        this.element.id = generateId();
        Object.entries(props).forEach(([key, value]) => {
            requestAnimationFrame(() => {
                if (key in this.element) {
                    /** @type {any} */ (this.element)[key] = value;
                }
                else {
                    console.warn(`Property ${key} does not exist on element.`);
                }
            });
        });
        if (parent instanceof componentController) {
            parent.addChild(this);
        }
        else {
            console.error("No Parent For Component To Attach To.");
            return;
        }
    }
};
/**
 * Creates and initializes a new HTML component.
 * @param {HtmlTag} tag - The HTML tag name to create.
 * @param {componentController} parent - The parent component to attach to.
 * @param {Object<string, any>} [props={}] - An object containing properties to set on the element.
 * @returns {$ElementInitializer} - The initialized HTML component.
 */
export const $Element = function (tag, parent, props = {}) {
    return new $ElementInitializer(tag, parent, props);
};
