export type UINode = Partial<{
    textContent: string;
    parent: UINode;
    styles: string;
    type: string;
    options: string;
    children: UINode[];
    attributes: Record<any, any>;
}> & {
    tagname: string;
    id: string;
};
export interface Renderer {
    root: any;
    clear(): void;
    render(node: UINode): void;
    update(node: UINode, prop: any, value: any): void;
}
declare global {
    interface GlobalThis {
        RENDERER: Renderer;
    }
}
