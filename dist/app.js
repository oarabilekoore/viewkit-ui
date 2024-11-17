import { componentController } from "./control.js";
import { generateId } from "./helpers.js";
export const $App = {};
function validateFraction(value) {
    if (value < 0 || value > 1) {
        throw new Error("Value must be between 0 and 1");
    }
    return value;
}
$App.Obj = class extends componentController {
    type;
    parent;
    constructor(tag, parent) {
        super();
        this.type = tag.toLocaleUpperCase();
        this.parent = parent;
        this.element = document.createElement(tag);
        this.element.id = generateId();
        parent.addChild(this);
    }
    style(colorA, colorB, radius, strokeClr, strokeWiidth, shadow) { }
    animate(type, callback, time) { }
    size(width, height) { }
    backColor(color) { }
    textColor(color) { }
};
$App.Button = function (parent, text, width, height) {
    const button = new $App.Obj("button", parent);
    button.batch({
        textContent: text,
        width: `${width}px`,
        height: `${height}px`,
    });
    button.css `
    display: inline-block;
    font-family: sans-serif;
    font-size: 14px;
    color: #000;
    background-color: #e0e0e0;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
    padding: 10px 20px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s, box-shadow 0.1s;
    cursor: pointer;
    outline: none;

    &:active {
      background-color: #d6d6d6;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
    }

    &:hover {
      background-color: #eeeeee;
    }
  `;
    return button;
};
