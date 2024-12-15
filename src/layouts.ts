import type { Layout, propertiesObject } from "./types.js";
import { ComponentProperties } from "./component.js";
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
 * This class extends ComponentProperties class and returns a Layout view,
 * In which takes in the type and sets correct styling this is also done
 * To the childAlignmentProperties.
 */
class Container extends ComponentProperties implements Layout {
    eltype: string;
    options: string;

    constructor(type: string, childAlignmentProperties: string, properties: Partial<propertiesObject> = {}) {
        super();
        this.element = document.createElement("div");
        this.element.id = generateId();
        this.eltype = `LAYOUT`;
        this.options = childAlignmentProperties;
        type ? layoutFitApi(this.element, type, this.options) : null;

        if (properties) {
            const height: number | undefined = properties?.height;
            const width: number | undefined = properties?.width;
            const parent = properties.parent;
            this.size(width, height, null);
            parent?.addChild(this);
        }
    }
}

export default Container;
