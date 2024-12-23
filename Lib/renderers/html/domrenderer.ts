import type { Renderer, UINode } from "../../global.js";
import { onPressEventHanlerMap } from "./events.js";

const viewOptions = [
    "noscrollbar",
    "scrollxy",
    "scrollx",
    "scrolly",
    "top",
    "bottom",
    "left",
    "right",
    "horizontal",
    "vertical",
    "vcenter",
    "center",
    "fillxy",
    "fillx",
    "filly",
];

const optionsApi = (element: HTMLElement, options: string) => {
    options
        .toLowerCase()
        .replace(/\s/g, "")
        .split(",")
        .forEach((option) => {
            if (viewOptions.includes(option)) {
                element.classList.add(option);
            } else {
                console.error(`Unknown option: ${option}`);
            }
        });
};

const layoutFitApi = (element: HTMLElement, type: string, options: string) => {
    if (options) optionsApi(element, options);

    const layoutTYPE = type.toLowerCase();

    switch (layoutTYPE) {
        case "linear":
            element.classList.add("layout-linear");
            break;
        case "absolute":
            element.classList.add("layout-absolute");
            break;
        case "frame":
            element.classList.add("layout-frame");
            break;
        case "stack":
            const directionClass = options?.includes("vertical") ? "layout-stack-vertical" : "layout-stack-horizontal";
            element.classList.add(directionClass);
            break;
        default:
            console.error("Unknown Layout", layoutTYPE);
    }
};

class DOMRenderer implements Renderer {
    root: HTMLElement;

    constructor(root: HTMLElement, node: UINode) {
        document.body.style.width = "100%";
        document.body.style.margin = "0";
        this.root = root;
        this.createElement(node);
    }

    clear(): void {
        this.root.innerHTML = "";
    }

    update(node: UINode, prop: keyof UINode, value: any): void {
        const element = document.getElementById(node.id);
        if (!element) {
            throw Error(`The Node Requested For An Update Is Invalid.\nThe id of the node might be invalid.`);
        }

        switch (prop) {
            case "textContent":
                element.textContent = value;
                break;
            case "styles":
                element.classList.add(value);
                break;
            case "id":
                const onPressHanlder = onPressEventHanlerMap.get(element.id) ?? (() => {});
                onPressEventHanlerMap.set(value, onPressHanlder);
                element.id = value;
                break;
            case "attributes":
                //TODO
                break;
            default:
                console.warn(`Unhandled property update: ${prop}`);
        }
    }

    private createElement(node: UINode) {
        const { tagname, styles, textContent, children, id, type, options, attributes } = node as any;
        let element = document.createElement(tagname);
        element.id = id;

        if (textContent) element.textContent = textContent;
        if (attributes) {
            const properties = Object.keys(attributes);

            properties.forEach((prop) => {
                element[prop] = attributes[prop];
                if (prop === "onpress") {
                    onPressEventHanlerMap.set(element.id, attributes[prop]);
                }
            });
        }

        if (styles) element.className = styles;

        // only layouts must have the type property !
        if (type) layoutFitApi(element, type, options || "");

        if (children) {
            for (const child of children) {
                const childElement = this.createElement(child);
                element.appendChild(childElement);
            }
        }

        this.root.appendChild(element);
        return element;
    }
}

export default DOMRenderer;
