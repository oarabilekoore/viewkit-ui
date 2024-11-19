import { componentController, rosanaComponent } from "./control.js";
export type HtmlTag = string;
export declare class $Element extends componentController {
    type: HtmlTag;
    parent: rosanaComponent;
    constructor(tag: HtmlTag, parent: rosanaComponent);
}
