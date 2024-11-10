export function $Element(tag: HtmlTag, parent: componentController, props?: {
    [x: string]: any;
} | undefined): {
    element: HTMLElement;
    elementClasses: Array<string>;
    eventListeners: Array<[string, Function]>;
    addChild(child: componentController): any;
    alignment(options: string): void;
    batch(props: object): any;
    on(event: string, handler: Function): any;
    css(styles: TemplateStringsArray | object): any;
    destroyChild(child: componentController): any;
    show(): void;
    hide(): void;
    gone(): void;
};
export type HtmlTag = string;
import { componentController } from "./control.js";
