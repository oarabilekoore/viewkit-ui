import { componentController } from "./control.js";
import { generateId } from "./helpers.js";
export const $Element = class extends componentController {
    type;
    parent;
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
