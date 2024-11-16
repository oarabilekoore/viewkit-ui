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
        parent.addChild(this);
    }
};
