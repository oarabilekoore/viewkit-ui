import { ComponentProperties } from "./component.js";
import type { Component, LayoutComponent } from "./types.js";
export type HtmlTag = string;

export class Button extends ComponentProperties {
    type: string;

    constructor(parent: LayoutComponent, text: string, width: number, height: number, options: string) {
        super();

        this.element = document.createElement("button");
        this.element.id = crypto.randomUUID();
        this.SetSize(width, height, null);
        this.type = "BUTTON";

        this.element.textContent = text;

        //@ts-ignore
        parent.AddChild(this);
    }
}

export class Text extends ComponentProperties {
    type: string;

    constructor(parent: LayoutComponent, text: string, width: number, height: number, options: string) {
        super();

        options ? (this.element = document.createElement(options.split(",")[0])) : (this.element = document.createElement("span"));
        this.element.id = crypto.randomUUID();
        this.type = "TEXT";

        this.element.textContent = text;
        //@ts-ignore
        parent.AddChild(this);
    }
}
