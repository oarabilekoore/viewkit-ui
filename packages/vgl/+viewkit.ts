export function genericElement(tag: string, parent: Parent) {
    const element = document.createElement(tag);

    if (parent instanceof HTMLElement) {
        parent.appendChild(element);
    } else {
        parent.appendChild(element);
    }

    return element;
}

export interface Parent {
    root: HTMLElement | HTMLDivElement;
    children: HTMLElement[];
    removeChildren(): void;
    appendChild(child: HTMLElement): void;
    removeChild(child: HTMLElement): void;
    insertBefore(child: HTMLElement, before: HTMLElement): void;
}
