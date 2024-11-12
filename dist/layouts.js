import { componentController } from "./control.js";
import { cssParser } from "./parser.js";
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
 * @param {HTMLElement} element - The target HTML element to apply the options to.
 * @param {string} options - A comma-separated string of options to apply to the element.
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
 * Configures a layout element based on the specified layout type and options.
 * @param {HTMLElement} layout - The HTML element representing the layout.
 * @param {string} type - The layout type (e.g., "linear", "absolute", "frame", "stack").
 * @param {string} [options] - Optional string representing layout options (e.g., "horizontal", "vertical").
 */
/**
 * Applies layout styles to the provided element based on the layout type and options.
 * @param {HTMLElement} layout - The target layout element.
 * @param {string} type - The layout type (e.g., "linear", "absolute", "frame", "stack").
 * @param {string} [options] - Additional layout options (e.g., "vertical").
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
/**
 * Class representing a layout initializer, which creates and configures layout elements.
 * @extends componentController
 */
const $LayoutInitializer = class extends componentController {
    /**
     * Creates a new layout element with the specified type and options.
     * @param {string} type - The layout type (e.g., "linear", "absolute", "frame", "stack").
     * @param {string} [options] - Optional string representing layout options (e.g., "horizontal", "vertical").
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
 * @returns {$LayoutInitializer} The created linear layout.
 */
export const $LinearLayout = function (childAlignmentProperties) {
    return new $LayoutInitializer("linear", childAlignmentProperties);
};
/**
 * Creates an absolute layout with optional child alignment properties.
 * @param {string} [childAlignmentProperties] - Optional string for child alignment (e.g., "top", "center").
 * @returns {$LayoutInitializer} The created absolute layout.
 */
export const $AbsoluteLayout = function (childAlignmentProperties) {
    return new $LayoutInitializer("absolute", childAlignmentProperties);
};
/**
 * Creates a frame layout with optional child alignment properties.
 * @param {string} [childAlignmentProperties] - Optional string for child alignment (e.g., "top", "center").
 * @returns {$LayoutInitializer} The created frame layout.
 */
export const $FrameLayout = function (childAlignmentProperties) {
    return new $LayoutInitializer("frame", childAlignmentProperties);
};
/**
 * Creates a stack layout, either horizontal or vertical, with optional child alignment properties.
 * @param {string} [stackOrientation="horizontal"] - The orientation of the stack layout (either "horizontal" or "vertical").
 * @returns {$LayoutInitializer} The created stack layout.
 */
export const $StackedLayout = function (stackOrientation = "horizontal") {
    return new $LayoutInitializer("stack", stackOrientation);
};
