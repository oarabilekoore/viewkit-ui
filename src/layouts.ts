import type { Component, LayoutComponent } from "./types.js";
import { ComponentProperties } from "./component.js";
import { eventHandlersMap } from "./component.js";
import { generateId } from "./helpers.js";

// This array is all the options available into the layout View.
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

// This function applies the correct child alignment in the Layout.
export const optionsApi = (element: HTMLElement, options: string) => {
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

// This function applies the appropriate classes to the matched Layout Type
function layoutFitApi(layout: HTMLElement, type: string, options: string) {
    if (options) optionsApi(layout, options);

    const layoutTYPE = type.toLowerCase();

    switch (layoutTYPE) {
        case "linear":
            layout.classList.add("layout-linear");
            break;
        case "absolute":
            layout.classList.add("layout-absolute");
            break;
        case "frame":
            layout.classList.add("layout-frame");
            break;
        case "stack":
            const directionClass = options?.includes("vertical") ? "layout-stack-vertical" : "layout-stack-horizontal";
            layout.classList.add(directionClass);
            break;
        default:
            console.error("Unknown Layout", layoutTYPE);
    }
}

// This class extends ComponentProperties class and returns a Layout view,
// In which takes in the type and sets correct styling this is also done
// To the childAlignmentProperties.

class LayoutView extends ComponentProperties implements LayoutComponent {
    type: string;
    options: string;

    constructor(type: string, childAlignmentProperties: string) {
        super();
        this.element = document.createElement("div");
        this.element.id = generateId();
        this.options = childAlignmentProperties;

        this.type = `LAYOUT`;
        type ? layoutFitApi(this.element, type, this.options) : null;
    }

    /*** Add a child component to this component.*/
    AddChild(child: Component): this {
        if (!child?.element) {
            console.warn(
                `The passed object is not a valid
                Rosana/HTML element.`,
                child
            );
            return this;
        }
        this.element.appendChild(child.element);
        return this;
    }

    /*** Remove a child component from the layout */
    DestroyChild(child: Component): this {
        if (!child?.element) {
            throw Error(
                `The passed child is null/undefined or not a
                 valid Rosana component.", "destroyChild Function`
            );
            return this;
        }

        eventHandlersMap.delete(child.element.id);
        child.element.remove();
        return this;
    }
}

/**
 * Create a layout, basically a special div. There are 4 types of layouts
 * (linear, absolute, stacked, frame)
 * The layouts align your children in a certain way, and more controlled
 * with the childAlignmentProperties.
 */
const Layout = function (type: string, childAlignmentProperties: string) {
    return new LayoutView(type, childAlignmentProperties);
};

export default Layout;
