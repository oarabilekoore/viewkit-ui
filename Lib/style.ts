import { generateClassName } from "./helpers.js";

function style_generator(styles: TemplateStringsArray | Record<string, any>, ...values: any[]): string {
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
}

export type StyleDefinition = Record<string, string | number | Record<string, any>>;
export type Styles = Record<string, StyleDefinition>;

class StyleSheet {
    static classMap: Record<string, string> = {};

    /**
     * Accepts a style object where keys are style names and values are style definitions.
     * Uses style_generator to generate unique class names and inject styles into the DOM.
     *
     * @param styles - The style definitions.
     * @returns A proxy object mapping style names to class names.
     */
    static Create(styles: Styles): Record<string, string> {
        if (typeof styles !== "object" || styles === null) {
            throw new Error("Styles must be a non-null object.");
        }

        for (const [styleName, styleDefinition] of Object.entries(styles)) {
            if (typeof styleDefinition !== "object" || styleDefinition === null) {
                throw new Error(`Style definition for '${styleName}' must be a non-null object.`);
            }

            // Parse the style definition and generate a class name
            const className = style_generator(styleDefinition);

            // Map the style name to the generated class name
            this.classMap[styleName] = className;
        }

        // Return a proxy to dynamically resolve class names
        return new Proxy(this.classMap, {
            get: (target, prop: string) => {
                if (prop in target) {
                    return target[prop];
                }
                throw new Error(`Style '${prop}' does not exist.`);
            },
        });
    }
}

export default StyleSheet;
