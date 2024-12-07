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
class PageLayout extends ComponentProperties {
    type;
    options;
    constructor(type, childAlignmentProperties) {
        super();
        this.element = document.createElement("div");
        this.element.id = generateId();
        this.options = childAlignmentProperties;
        this.type = `LAYOUT`;
        type ? layoutFitApi(this.element, type, this.options) : null;
    }
}
export default PageLayout;
