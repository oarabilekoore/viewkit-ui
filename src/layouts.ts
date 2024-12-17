import type { Layout, Widget, WidgetOptions } from "./types.js";
import { onPressEventHanlerMap } from "./component.js";
import { WidgetProperties } from "./component.js";
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

/**
 * This class extends WidgetProperties class and returns a Layout view,
 * In which takes in the type and sets correct styling this is also done
 * To the childAlignmentProperties.
 */
class Container extends WidgetProperties implements Layout {
    type: string;
    options: string;

    constructor(type: string, childAlignmentProperties: string, properties: Partial<WidgetOptions> = {}) {
        super();
        this.element = document.createElement("div");
        this.element.id = generateId();
        this.type = `LAYOUT`;
        this.options = childAlignmentProperties;
        type ? layoutFitApi(this.element, type, this.options) : null;

        const { style = "", parent } = properties;
        if (style.length === 0) {
            return;
        }
        this.element.classList.add(style);
        parent?.AddChild(this);
    }

    /*** Add a child component to this component.*/
    AddChild(child: Widget): this {
        if (!child?.element) {
            console.warn(
                `The passed object is not a valid
                Rosana/HTML element.`,
                child,
            );
            return this;
        }
        this.element.appendChild(child.element);
        child.isMounted.value = true;
        return this;
    }

    /** Clear the layout and remove all children */
    Clear(): this {
        this.element.innerHTML = "";
        return this;
    }

    /*** Remove a child component from the layout */
    RemoveChild(child: Widget): this {
        if (!child?.element) {
            throw Error(
                `The passed child is null/undefined or not a
                 valid Rosana component.", "destroyChild Function`,
            );
            return this;
        }

        onPressEventHanlerMap.delete(child.element.id);
        child.isMounted.value = false;
        child.element.remove();
        return this;
    }
}

export default Container;
