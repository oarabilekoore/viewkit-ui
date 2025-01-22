import { Layout, UNIVERSAL_PROPERTIES } from "../+droidxl.js";

class Button extends UNIVERSAL_PROPERTIES {
    node: HTMLButtonElement;
    constructor(text?: string, width?: number, height?: number, options?: string, parent?: Layout) {
        super();
        this.node = document.createElement("button");
        text ? (this.node.textContent = text) : null;
        parent ? parent.AddChild(this.node) : null;
    }
}

export default Button;
