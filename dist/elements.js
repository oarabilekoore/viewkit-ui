import { componentController } from "./control.js";
import { generateId } from "./helpers.js";
/** @typedef {string} HtmlTag */
/**
 * Initializes an HTML element with specified properties and attaches it to a parent component.
 * @class
 * @extends componentController
 */
export const $Element = class extends componentController {
    /**
     * Creates an HTML element.
     * @param {HtmlTag} tag - The HTML tag name to create (e.g., 'div', 'span').
     * @param {componentController} parent - The parent component to attach to
     */
    constructor(tag, parent) {
        super();
        this.type = tag.toLocaleUpperCase();
        this.parent = parent;
        this.element = document.createElement(tag);
        this.element.id = generateId();
        if (parent instanceof componentController) {
            parent.addChild(this);
        }
        else {
            console.error("No Parent For Component To Attach To.");
            return;
        }
    }
};
