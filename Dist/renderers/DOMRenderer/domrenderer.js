class DOMRenderer {
    root;
    constructor(root) {
        this.root = root;
    }
    render(node) {
        this.clear();
        const element = this.createElement(node);
        this.root.appendChild(element);
    }
    clear() {
        this.root.innerHTML = "";
    }
    createElement(node) {
        const { name, styles, textContent, children, id } = node;
        const ctx = document.createElement(name);
        ctx.id = id;
        if (styles) {
            ctx.className = styles;
        }
        if (textContent) {
            ctx.textContent = textContent;
        }
        if (children) {
            for (const child of children) {
                const childElement = this.createElement(child);
                ctx.appendChild(childElement);
            }
        }
        return ctx;
    }
}
export default DOMRenderer;
