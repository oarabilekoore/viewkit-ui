import { rosanaComponentProperties } from "./control.js";
import type { rosanaComponent } from "./types.js";
export type HtmlTag = string;

export class $Element extends rosanaComponentProperties {
    type: HtmlTag;
    parent: rosanaComponent;
    element: HTMLElement;

    constructor(tag: HtmlTag, parent: rosanaComponent) {
        super();

        this.type = tag.toUpperCase() as HtmlTag;
        this.parent = parent;

        this.element = document.createElement(tag);
        this.element.id = crypto.randomUUID();

        parent.addChild(this);
    }
}

export class Button extends rosanaComponentProperties {
    type: string;

    constructor(parent: rosanaComponent) {
        super();

        this.element = document.createElement("button");
        this.type = "BUTTON";

        parent.addChild(this);
    }
}
