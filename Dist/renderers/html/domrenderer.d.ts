import type { Renderer, UINode } from "../../global";
declare class DOMRenderer implements Renderer {
    root: HTMLElement;
    constructor(root: HTMLElement, node: UINode);
    clear(): void;
    update(node: UINode, prop: keyof UINode, value: any): void;
    private createElement;
}
export default DOMRenderer;
