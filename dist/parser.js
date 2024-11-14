import { generateClassName } from "./helpers.js";
export const cssParser = (styles, ...values) => {
    const className = generateClassName();
    const styleSheet = document.styleSheets[0];
    let cssString = "";
    let nestedCssRules = [];
    let mediaQueryRules = [];
    const parseStyles = (styles, selector) => {
        let baseStyles = "";
        Object.entries(styles).forEach(([key, value]) => {
            if (typeof value === "object") {
                if (key.startsWith("@")) {
                    mediaQueryRules.push({ media: key, selector, styles: value });
                }
                else if (key.startsWith("&:")) {
                    nestedCssRules.push({ selector: key.replace("&", selector), styles: value });
                }
                else {
                    nestedCssRules.push({ selector: `${selector} ${key}`, styles: value });
                }
            }
            else {
                baseStyles += `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}; `;
            }
        });
        return baseStyles;
    };
    if (typeof styles === "object" && !Array.isArray(styles)) {
        cssString = parseStyles(styles, `.${className}`);
    }
    else if (Array.isArray(styles)) {
        cssString = styles.reduce((result, str, i) => result + str + (values[i] || ""), "");
    }
    if (document.readyState === "loading" && cssString) {
        document.head.insertAdjacentHTML("beforeend", `<style>.${className} { ${cssString} }</style>`);
    }
    else if (cssString) {
        styleSheet.insertRule(`.${className} { ${cssString} }`, styleSheet.cssRules.length);
    }
    nestedCssRules.forEach(({ selector, styles }) => {
        const nestedCssString = parseStyles(styles, selector);
        if (nestedCssString) {
            styleSheet.insertRule(`${selector} { ${nestedCssString} }`, styleSheet.cssRules.length);
        }
    });
    mediaQueryRules.forEach(({ media, selector, styles }) => {
        const nestedCssString = parseStyles(styles, selector);
        if (nestedCssString) {
            styleSheet.insertRule(`${media} { ${selector} { ${nestedCssString} } }`, styleSheet.cssRules.length);
        }
    });
    return className;
};
