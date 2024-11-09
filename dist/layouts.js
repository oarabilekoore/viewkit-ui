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
    const functions = {
        noscrollbar: () => {
            element.classList.add("noscrollbar");
        },
        fillxy: () => {
            let className = cssParser({
                width: "100%",
                height: window.innerHeight + "px",
            });
            element.classList.add(className);
        },
        fillx: () => {
            let className = cssParser({
                width: "100%",
            });
            element.classList.add(className);
        },
        filly: () => {
            let className = cssParser({
                height: window.innerHeight + "px",
            });
            element.classList.add(className);
        },
        scrollxy: () => {
            let className = cssParser({
                overflow: "auto",
            });
            element.classList.add(className);
        },
        scrollx: () => {
            let className = cssParser({
                overflowX: "auto",
            });
            element.classList.add(className);
        },
        scrolly: () => {
            let className = cssParser({
                overflowY: "auto",
            });
            element.classList.add(className);
        },
        left: () => {
            let className = cssParser({
                display: "flex",
                justifyContent: "flex-start",
            });
            element.classList.add(className);
        },
        right: () => {
            let className = cssParser({
                display: "flex",
                justifyContent: "flex-end",
            });
            element.classList.add(className);
        },
        center: () => {
            let className = cssParser({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            });
            element.classList.add(className);
        },
        vcenter: () => {
            let className = cssParser({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            });
            element.classList.add(className);
        },
        bottom: () => {
            let className = cssParser({
                display: "flex",
                alignItems: "flex-end",
            });
            element.classList.add(className);
        },
        top: () => {
            let className = cssParser({
                display: "flex",
                alignItems: "flex-start",
            });
            element.classList.add(className);
        },
        horizontal: () => {
            let className = cssParser({
                display: "flex",
                flexDirection: "row !important",
            });
            element.classList.add(className);
        },
        vertical: () => {
            let className = cssParser({
                display: "flex",
                flexDirection: "column",
            });
            element.classList.add(className);
        },
    };
    options
        .toLowerCase()
        .replace(/\s/g, "")
        .split(",")
        .forEach((el) => {
        if (viewOptions.includes(el)) {
            // @ts-ignore
            functions[el]();
        }
        else {
            console.error(`Unknown option: ${el}`);
        }
    });
};
/**
 * Configures a layout element based on the specified layout type and options.
 * @param {HTMLElement} layout - The HTML element representing the layout.
 * @param {string} type - The layout type (e.g., "linear", "absolute", "frame", "stack").
 * @param {string} [options] - Optional string representing layout options (e.g., "horizontal", "vertical").
 */
function layoutFitApi(layout, type, options) {
    options ? optionsApi(layout, options) : null;
    let layoutTYPE = type.toLowerCase();
    if (layoutTYPE == "linear") {
        let className = cssParser({
            display: "inline-flex",
            position: "relative !important",
            flexDirection: "column !important",
        });
        layout.classList.add(className);
    }
    else if (layoutTYPE == "absolute") {
        let className = cssParser({
            display: "flex",
        });
        layout.classList.add(className);
    }
    else if (layoutTYPE === "frame") {
        layout.style.position = "relative";
    }
    else if (layoutTYPE === "stack") {
        let className = cssParser({
            display: "flex",
            // @ts-ignore
            flexDirection: options.includes("vertical") ? "column" : "row",
        });
        layout.classList.add(className);
    }
    else {
        console.error("Unknown Layout ", layout);
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
        // @ts-ignore
        this.element.type = "Layout";
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
