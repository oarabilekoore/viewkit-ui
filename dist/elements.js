import { ComponentProperties } from "./component.js";
export class Button extends ComponentProperties {
    type;
    constructor(parent, text, width, height, options) {
        super();
        this.element = document.createElement("button");
        //@ts-ignore
        this.SetSize(width, height);
        this.type = "BUTTON";
        this.element.textContent = text;
        parent.AddChild(this);
    }
}
