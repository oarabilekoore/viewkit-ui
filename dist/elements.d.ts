/** @typedef {string} HtmlTag */
/**
 * Initializes an HTML element with specified properties and attaches it to a parent component.
 * @class
 * @extends componentController
 */
export const $Element: {
    new (tag: HtmlTag, parent: componentController): {
        type: string;
        parent: componentController;
        element: HTMLElement;
        elementClasses: Array<string>;
        eventListeners: Array<[string, Function]>;
        addChild(child: componentController): any;
        alignment(options: string): void;
        batch(props: object): void;
        onclick: Function;
        css(styles: TemplateStringsArray | object): any;
        destroyChild(child: componentController): any;
        show(): void;
        hide(): void;
        gone(): void;
    };
};
export type HtmlTag = string;
import { componentController } from "./control.js";
