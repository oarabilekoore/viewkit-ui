import { generateClassName } from "./helpers.js";

/**
 * @param {TemplateStringsArray | object} styles
 * @param {...any} values
 * @returns {string} HTMLElementClassName
 */
export const cssParser = (styles, ...values) => {
    const className = generateClassName();
    const styleSheet = document.styleSheets[0];

    let cssString = "";

    /** @type {Array<{selector: string, styles: object}>} */
    let nestedCssRules = [];

    /** @type {Array<{media: string, selector: string, styles: object}>} */
    let mediaQueryRules = [];

    /**
     * @param {TemplateStringsArray | object} styles
     * @param {any} selector
     * @returns {string} Parsed CSS string
     */
    const parseStyles = (styles, selector) => {
        let baseStyles = "";
        Object.entries(styles).forEach(([key, value]) => {
            if (typeof value === "object") {
                if (key.startsWith("@")) {
                    // Handle media queries
                    mediaQueryRules.push({
                        media: key,
                        selector,
                        styles: value,
                    });
                } else if (key.startsWith("&:")) {
                    // Handle pseudo-classes like &:hover
                    const pseudoClass = key.replace("&", selector);
                    nestedCssRules.push({
                        selector: pseudoClass,
                        styles: value,
                    });
                } else {
                    // Handle nested selectors (like & > div)
                    nestedCssRules.push({
                        selector: `${selector} ${key}`,
                        styles: value,
                    });
                }
            } else {
                // Handle basic styles
                baseStyles += `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}; `;
            }
        });
        return baseStyles;
    };

    // Handle the styles argument (either object or template literal)
    if (typeof styles === "object" && !Array.isArray(styles)) {
        cssString = parseStyles(styles, `.${className}`);
    } else if (Array.isArray(styles)) {
        cssString = styles.reduce((result, str, i) => {
            return result + str + (values[i] || "");
        }, "");
    }

    // Apply critical styles inline if in early loading phase
    if (document.readyState === "loading" && cssString) {
        document.head.insertAdjacentHTML(
            "beforeend",
            `<style>.${className} { ${cssString} }</style>`
        );
    } else if (cssString) {
        styleSheet.insertRule(`.${className} { ${cssString} }`, styleSheet.cssRules.length);
    }

    // Insert nested CSS rules (like &:hover)
    nestedCssRules.forEach(({ selector, styles }) => {
        const nestedCssString = parseStyles(styles, selector);
        if (nestedCssString) {
            styleSheet.insertRule(
                `${selector} { ${nestedCssString} }`,
                styleSheet.cssRules.length
            );
        }
    });

    // Insert media query rules (like @media)
    mediaQueryRules.forEach(({ media, selector, styles }) => {
        const nestedCssString = parseStyles(styles, selector);
        if (nestedCssString) {
            styleSheet.insertRule(
                `${media} { ${selector} { ${nestedCssString} } }`,
                styleSheet.cssRules.length
            );
        }
    });

    return className;
};
