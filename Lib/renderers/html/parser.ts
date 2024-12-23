import { generateClassName } from "../../helpers.js";

export const cssParser = (styles: TemplateStringsArray | Record<string, any>, ...values: any[]): string => {
    let cssString = "";
    const className = generateClassName();
    const styleSheet = document.styleSheets[0];

    let nestedCssRules: Array<{ selector: string; styles: Record<string, any> }> = [];
    let mediaQueryRules: Array<{ media: string; selector: string; styles: Record<string, any> }> = [];

    const parseStyles = (styles: Record<string, any>, selector: string): string => {
        let baseStyles = "";
        Object.entries(styles).forEach(([key, value]) => {
            if (typeof value === "object") {
                if (key.startsWith("@")) {
                    // Media query
                    mediaQueryRules.push({ media: key, selector, styles: value });
                } else if (key.startsWith("&")) {
                    // Handle pseudo-classes (&:hover -> .classname:hover)
                    const pseudoSelector = key.replace("&", selector);
                    nestedCssRules.push({ selector: pseudoSelector, styles: value });
                } else {
                    // Nested selector (e.g., div, span)
                    nestedCssRules.push({ selector: `${selector} ${key}`, styles: value });
                }
            } else {
                // Convert camelCase to kebab-case for CSS properties
                baseStyles += `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}; `;
            }
        });
        return baseStyles;
    };

    if (typeof styles === "object" && !Array.isArray(styles)) {
        // Handle object-style definitions
        cssString = parseStyles(styles, `.${className}`);
    } else if (Array.isArray(styles)) {
        // Handle TemplateStringsArray definitions
        cssString = styles.reduce((result, str, i) => result + str + (values[i] || ""), "");
    }

    // Add base styles
    if (cssString) {
        styleSheet.insertRule(`.${className} { ${cssString} }`, styleSheet.cssRules.length);
    }

    // Add nested rules (pseudo-classes, nested selectors)
    nestedCssRules.forEach(({ selector, styles }) => {
        const nestedCssString = parseStyles(styles, selector);
        if (nestedCssString) {
            styleSheet.insertRule(`${selector} { ${nestedCssString} }`, styleSheet.cssRules.length);
        }
    });

    // Add media query rules
    mediaQueryRules.forEach(({ media, selector, styles }) => {
        const nestedCssString = parseStyles(styles, selector);
        if (nestedCssString) {
            styleSheet.insertRule(`${media} { ${selector} { ${nestedCssString} } }`, styleSheet.cssRules.length);
        }
    });

    return className;
};
