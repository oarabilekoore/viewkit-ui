class DOMRenderer {
    root;
    constructor(root) {
        this.root = root;
    }
    render(node) {
        this.clear();
        this.createElement(node);
    }
    clear() {
        this.root.innerHTML = "";
    }
    createElement(node) {
        const { name, styles, textContent, children, id } = node;
        let ctx = document.createElement(name);
        ctx.id = id;
        styles ? (ctx.className = styles) : null;
        if (textContent) {
            ctx.textContent = textContent;
        }
        if (children) {
            for (const child of children) {
                this.createElement(child);
            }
        }
        this.root.appendChild(ctx);
    }
}
export default DOMRenderer;
