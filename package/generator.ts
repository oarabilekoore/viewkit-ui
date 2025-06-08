function parseArguments(args: any[]): { parent?: any; text?: string; children?: Array<any> } {
    let parent: HTMLElement | undefined;
    let text: string | undefined;
    let children: Array<any> | undefined;

    for (const arg of args) {
        if (arg instanceof HTMLElement) {
            parent = arg;
        }
        if (typeof arg === "string") {
            text = arg;
        }
        if (Array.isArray(arg)) {
            children = arg;
        }
    }
    return { parent, text, children };
}

/**
 * INTERNAL USE: Returns a function, used in Widgets
 * @param tag
 * @returns
 */
export function genericElement<T>(tag: string) {
    return (...args: any[]) => {
        const { parent, text, children } = parseArguments(args);
        return createElement<T>({ tag, text, children, parent });
    };
}

function createElement<T>(data: { tag: string; parent?: any; text?: string; children?: HTMLElement[] }): T {
    const { tag, parent, text, children } = data;
    const element = document.createElement(tag);
    text ? (element.textContent = text) : null;
    parent ? parent.appendChild(element) : null;
    children ? appendchildren() : null;

    function appendchildren() {
        const masterparent = element;
        for (const child in children) {
            masterparent.appendChild(child as unknown as HTMLElement);
        }
    }
    return element as T;
}
