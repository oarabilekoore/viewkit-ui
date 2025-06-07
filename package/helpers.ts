import { css } from "./styled";
css(
    {
        overflow: "hidden !important",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
    },
    "noscrollbar"
);

css(
    {
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
    "noscrollbar"
);

css(
    {
        visibility: "visible",
    },
    "show"
);

css(
    {
        visibility: "hidden",
    },
    "hide"
);

css(
    {
        display: "none",
    },
    "gone"
);

css(
    {
        display: "flex !important",
        flexDirection: "column !important",
        alignItems: "flex-start !important",
    },
    "top_to_bottom"
);

css(
    {
        display: "flex !important",
        alignItems: "flex-end !important",
    },
    "bottom_to_top"
);

css(
    {
        display: "flex !important",
        justifyContent: "flex-start !important",
    },
    "left_to_right"
);

css(
    {
        display: "flex !important",
        justifyContent: "flex-end !important",
    },
    "right_to_left"
);

css(
    {
        display: "flex !important",
        justifyContent: "center !important",
        alignItems: "center !important",
    },
    "center"
);

css(
    {
        display: "flex !important",
        alignItems: "center !important",
    },
    "vcenter"
);

css(
    {
        display: "flex !important",
        justifyContent: "center !important",
    },
    "hcenter"
);

css(
    {
        width: "100dvw !important",
        height: "100dvh !important",
    },
    "fillxy"
);

css(
    {
        width: "100% !important",
        height: "fit-content",
    },
    "fillx"
);

css(
    {
        height: "100% !important",
        width: "fit-content",
    },
    "filly"
);

css(
    {
        height: "inherit",
        width: "inherit",
    },
    "inherit"
);

css(
    {
        overflowX: "scroll !important",
        overflowY: "scroll !important",
    },
    "scrollxy"
);

css(
    {
        overflowX: "scroll !important",
        overflowY: "hidden !important",
    },
    "scrollx"
);

css(
    {
        overflowY: "scroll !important",
        overflowX: "hidden !important",
    },
    "scrolly"
);

css(
    {
        display: "inline-flex !important",
        position: "relative !important",
        flexDirection: "column !important",
    },
    "layout-linear"
);

css(
    {
        display: "flex !important",
        position: "absolute !important",
    },
    "layout-absolute"
);

css(
    {
        display: "grid !important",
    },
    "layout-grid"
);

/**
 * Boolean based visibility function, decide if the element is visible or not
 * @param element {HTMLElement}
 * @param condition {boolean}
 */
export function showIF(element: HTMLElement, condition: boolean) {
    if (condition) {
        element.classList.add("show");
    } else {
        element.classList.add("hide");
    }
}
