type StyleDefinition = Record<string, string | number | Record<string, any>>;
type Styles = Record<string, StyleDefinition>;
declare class StyleSheet {
    static classMap: Record<string, string>;
    constructor();
    /**
     * Accepts a style object where keys are style names and values are style definitions.
     * Uses cssParser to generate unique class names and inject styles into the DOM.
     *
     * @param styles - The style definitions.
     * @returns A proxy object mapping style names to class names.
     */
    static Create(styles: Styles): Record<string, string>;
}
export default StyleSheet;
