import { cssParser } from "./parser";

type StyleDefinition = Record<string, string | number | Record<string, any>>;
type Styles = Record<string, StyleDefinition>;

class StyleSheet {
    static classMap: Record<string, string> = {};

    constructor() {}

    /**
     * Accepts a style object where keys are style names and values are style definitions.
     * Uses cssParser to generate unique class names and inject styles into the DOM.
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
            const className = cssParser(styleDefinition);

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
