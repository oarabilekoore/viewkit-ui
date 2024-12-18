import { onPressEventHanlerMap } from "./onpress.js";
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
const optionsApi = (element, options) => {
    options
        .toLowerCase()
        .replace(/\s/g, "")
        .split(",")
        .forEach((option) => {
        if (viewOptions.includes(option)) {
            element.classList.add(option);
        }
        else {
            console.error(`Unknown option: ${option}`);
        }
    });
};
// This function applies the appropriate classes to the matched Layout Type
function layoutFitApi(layout, type, options) {
    if (options)
        optionsApi(layout, options);
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
 * Represents a container for holding and managing child elements in a layout.
 * @class
 */
class Container {
    element;
    options;
    constructor(type, childAlignmentProperties, properties = {}) {
        this.element = document.createElement("div");
        this.element.id = generateId();
        this.options = childAlignmentProperties;
        type ? layoutFitApi(this.element, type, this.options) : null;
        const { style, parent } = properties;
        style ? this.element.classList.add(style) : null;
        parent ? parent.AddChild(this.element) : null;
    }
    /*** Add a child component to this component.*/
    AddChild(child) {
        this.element.appendChild(child);
        return this;
    }
    /** Clear the layout and remove all children */
    Clear() {
        this.element.innerHTML = "";
        return this;
    }
    /*** Remove a child component from the layout */
    RemoveChild(child) {
        onPressEventHanlerMap.delete(child.id);
        child.remove();
        return this;
    }
}
export default Container;
