import { componentController } from "./control.js";
import { generateId } from "./helpers.js";
let viewOptions = [
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
/**
 * Applies the provided options to the given HTML element by adding corresponding CSS classes.
 */
export const optionsApi = (element, options) => {
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
/**
 * Applies layout styles to the provided element based on the layout type and options.
 */
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
            const directionClass = options?.includes("vertical")
                ? "layout-stack-vertical"
                : "layout-stack-horizontal";
            layout.classList.add(directionClass);
            break;
        default:
            console.error("Unknown Layout", layoutTYPE);
    }
}
const $LayoutInitializer = class extends componentController {
    type;
    /**
     * Creates a new layout element with the specified type and options.
     */
    constructor(type, options) {
        super();
        this.element = document.createElement("div");
        this.element.id = generateId();
        this.type = `layout-${type}`;
        type ? layoutFitApi(this.element, type, options) : null;
    }
};
/**
 * Creates a linear layout with optional child alignment properties.
 * @param {string} [childAlignmentProperties] - Optional string for child alignment (e.g., "top", "center").
 */
export const $LinearLayout = function (childAlignmentProperties) {
    return new $LayoutInitializer("linear", childAlignmentProperties);
};
/**
 * Creates an absolute layout with optional child alignment properties.
 * @param {string} [childAlignmentProperties] - Optional string for child alignment (e.g., "top", "center").
 */
export const $AbsoluteLayout = function (childAlignmentProperties) {
    return new $LayoutInitializer("absolute", childAlignmentProperties);
};
/**
 * Creates a frame layout with optional child alignment properties.
 * @param {string} [childAlignmentProperties] - Optional string for child alignment (e.g., "top", "center").
 */
export const $FrameLayout = function (childAlignmentProperties) {
    return new $LayoutInitializer("frame", childAlignmentProperties);
};
/**
 * Creates a stack layout, either horizontal or vertical, with optional child alignment properties.
 * @param {string} [stackOrientation="horizontal"] - The orientation of the stack layout (either "horizontal" or "vertical").
 */
export const $StackedLayout = function (stackOrientation = "horizontal") {
    return new $LayoutInitializer("stack", stackOrientation);
};
