import { ComponentProperties } from "./component.js";
import type { Layout } from "./types.js";
export type HtmlTag = string;

export class Button extends ComponentProperties {
    type: string;

    constructor(parent: Layout, text: string, width: number, height: number, options: string) {
        super();

        this.element = document.createElement("button");
        //@ts-ignore
        this.SetSize(width, height);
        this.type = "BUTTON";

        this.element.textContent = text;

        parent.AddChild(this);
    }
}
