import { Layout, LayoutOptions, LayoutTypes, LayoutToPageBinder } from "./+droidxl.js";
import Button from "./controls/button.js";

export const ui = {
    AddEventListener: (event: string, callback: Function) => {},
    AddLayout: (layout: Layout, type?: LayoutTypes, options?: LayoutOptions) => {
        LayoutToPageBinder(layout, type, options);
    },
    CreateLayout: function (type: LayoutTypes, options: LayoutOptions) {
        return new Layout(type, options);
    },
    CreateButton: function (text?: string, width?: number, height?: number, options?: string, parent?: Layout) {
        return new Button(text, width, height, options, parent);
    },
    SetBackColor: function (color: string) {
        document.body.style.color = color;
    },
};
