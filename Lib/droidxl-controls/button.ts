import { DXLLayout, UNIVERSAL_PROPERTIES } from "../+droidxl.js";
import { Log } from "../helpers.js";

class DXLButton extends UNIVERSAL_PROPERTIES {
    node: HTMLButtonElement;
    constructor(text: string, parent: DXLLayout, attributes: { [key: string]: any } = {}) {
        super();
        this.node = document.createElement("button");
        text ? (this.node.textContent = text) : null;

        Object.keys(attributes).forEach((key) => {
            // @ts-ignore
            this.node[key] = attributes[key];
        });
        parent ? parent.AddChild(this) : Log`Button Control Needs A Parent Layout`;
    }
}

function Button(text: string, parent: DXLLayout, attributes: object = {}) {
    return new DXLButton(text, parent, attributes);
}

export default Button;
