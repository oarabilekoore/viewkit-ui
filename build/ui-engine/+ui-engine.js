function parseArguments(args) {
    let parent;
    let text;
    for (let arg of args) {
        if (arg instanceof HTMLElement) {
            parent = arg;
        }
        if (typeof arg === "string") {
            text = arg;
        }
    }
    if (!parent) {
        throw new Error("Parent HTMLElement is required.");
    }
    return { parent, text };
}
export function genericElement(tag) {
    return (...args) => {
        const { parent, text } = parseArguments(args);
        return createElement({ tag, text }, parent);
    };
}
export function createElement(data, parent) {
    const element = document.createElement(data.tag);
    data.text ? (element.textContent = data.text) : null;
    if (parent instanceof HTMLElement) {
        parent.appendChild(element);
    }
    else {
        parent.root.appendChild(element);
    }
    return element;
}
export function showIF(element, condition) {
    if (condition) {
        element.classList.add("show");
    }
    else {
        element.classList.add("hide");
    }
}
