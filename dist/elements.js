import { rosanaComponentProperties } from "./control.js";
export class $Element extends rosanaComponentProperties {
    type;
    parent;
    element;
    constructor(tag, parent) {
        super();
        this.type = tag.toUpperCase();
        this.parent = parent;
        this.element = document.createElement(tag);
        this.element.id = crypto.randomUUID();
        parent.addChild(this);
    }
}
export class Button extends rosanaComponentProperties {
    type;
    constructor(parent) {
        super();
        this.element = document.createElement("button");
        this.type = "BUTTON";
        parent.addChild(this);
    }
}
