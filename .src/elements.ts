import { componentController } from "./control.js";
import { generateId } from "./helpers.js";

export type HtmlTag = string;

export const $Element = class extends componentController {
    type: string;
    parent: componentController;

    constructor(tag: HtmlTag, parent: componentController) {
        super();

        this.type = tag.toLocaleUpperCase();
        this.parent = parent;

        this.element = document.createElement(tag);
        this.element.id = generateId();
        parent.addChild(this);
    }
};
