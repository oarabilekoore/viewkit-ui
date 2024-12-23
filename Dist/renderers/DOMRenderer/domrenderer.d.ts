import type { Renderer, UINode } from "../../types";
declare class DOMRenderer implements Renderer {
    private root;
    constructor(root: HTMLElement);
    render(node: UINode): void;
    private clear;
    private createElement;
}
export default DOMRenderer;
