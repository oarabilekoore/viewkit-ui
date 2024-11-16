import { componentController } from "./control.js";
type HtmlTag = string;
export declare const $Element: {
    new (tag: HtmlTag, parent: componentController): {
        type: string;
        parent: componentController;
        element: any;
        elementClasses: Array<string>;
        addChild(child: componentController): any | undefined;
        alignment(options: string): any;
        batch(props: object): any;
        onclick: Function;
        css(styles: TemplateStringsArray | object): any;
        destroyChild(child: componentController): any;
        show(): any;
        hide(): any;
        gone(): any;
    };
};
export {};
