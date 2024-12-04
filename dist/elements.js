import { ComponentProperties } from "./component.js";
export class HtmlWidget extends ComponentProperties {
    constructor(parent, tag) {
        super();
        this.element = document.createElement(tag);
        parent?.AddChild(this);
    }
}
export const Button = function (parent, text, width, height) {
    return new HtmlWidget(parent, "button").SetText(text).SetSize(width, height, null);
};
export const Text = function (parent, text, width, height, options) {
    return new HtmlWidget(parent, options?.split(",")[0] || "span").SetText(text).SetSize(width, height, null);
};
