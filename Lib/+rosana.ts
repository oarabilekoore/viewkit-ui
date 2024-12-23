import { makeThisObservable } from "./state/observer.js";
import { generateId } from "./helpers.js";
import type { WidgetProps, UINode } from "./global.js";

// To bridge ui concepts from the web and native platforms, we will
// refer to a View as a Widget, an HtmlElement as a Widget.

export class Widget {
    private node: UINode;

    constructor() {
        this.node = {} as UINode;
    }

    Build(name: string, properties: Partial<UINode> = {}) {
        this.node = {
            id: generateId(),
            tagname: name,
            ...properties,
        };

        if (properties.parent) {
            if (!properties.parent.children) {
                properties.parent.children = [];
            }
            properties.parent.children.push(this.node);
        }

        this.node = makeThisObservable(this.node);

        if (this.node.observe) {
            this.node.observe((prop: any, value: any) => {
                if (shouldWidgetUpdate(this.node, prop, value)) {
                    if (window.RENDERER) {
                        console.log("Changing Node:");
                        console.table(this.node);
                        window.RENDERER.update(this.node, prop, value);
                    }
                }
            });
        } else {
            console.error("Observation functionality is not available on the node.");
        }

        return this.node;
    }
}

// Helper function to determine whether an update should occur
function shouldWidgetUpdate(node: UINode, prop: keyof UINode, value: any): boolean {
    if (value === undefined || value === null || value === "") {
        return false;
    }
    // Ignore redundant updates where the value hasn't changed
    if (node[prop] === value) {
        return false;
    }

    // Ignore updates for children during initial render
    if (prop === "children" && Array.isArray(value) && value.length === 0) {
        return false;
    }
    return true;
}

/**
 * @summary
 * create a layout, alternativley known as a div.
 *
 * @description
 * It accepts children and has a type, the type describes how
 * children are laid out in the space, so
 * as the available methods in the layout.
 * the options parameter takes in descriptions of how
 * children will be aligned, and the properties of the layout
 * these are like making it scrollable or fill in the x or y
 * direction.
 * @param type
 * @param options
 * @param props
 */
export const CreateLayout = function (type: string, options: string, props: Partial<WidgetProps> = {}) {
    const widget = new Widget();
    return widget.Build("div", {
        ...props,
        type,
        options,
    });
};

/**
 * @summary
 * add a button to a parent widget.
 *
 * @description
 * It accepts the text-content of the button and WidgetProperties
 * as the second parameter.
 * Widget properties have partial and in-partial properties.
 *
 * Rely on the LSP to view these, but a parent is a must, an id too
 * is a must but if you dont provide one we will asign one
 * automatically.
 * @param text
 * @param props
 */
export const Button = function (text: string, props: WidgetProps = {}) {
    const widget = new Widget();
    return widget.Build("button", {
        ...props,
        textContent: text,
    });
};

/**
 * @summary
 * add an image to your parent widget.
 *
 * @description
 * the first parameter 'src' is the source url of the image, and the
 * second follows our global Widget Properties.
 * @param src

 */
export const Image = function (src: string, props: WidgetProps) {
    const widget = new Widget();
    return widget.Build("img", {
        ...props,
        attributes: {
            src,
        },
    });
};
