import { componentController, rosanaComponent } from "./control.js";
import { generateId } from "./helpers.js";

export type HtmlTag = string;

export class $Element extends componentController {
    type: HtmlTag;
    parent: rosanaComponent;

    constructor(tag: HtmlTag, parent: rosanaComponent) {
        super();

        this.type = tag.toUpperCase() as HtmlTag;
        this.parent = parent;

        this.element = document.createElement(tag);
        this.element.id = generateId();

        parent.addChild(this);
    }
}
