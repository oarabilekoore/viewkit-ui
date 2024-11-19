import { componentController } from "./control.js";
import { generateId } from "./helpers.js";
export class $Element extends componentController {
    type;
    parent;
    constructor(tag, parent) {
        super();
        this.type = tag.toUpperCase();
        this.parent = parent;
        this.element = document.createElement(tag);
        this.element.id = generateId();
        parent.addChild(this);
    }
}
