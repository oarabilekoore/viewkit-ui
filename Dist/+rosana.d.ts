import type { WidgetProps, UINode } from "./global";
export declare class Widget {
    private node;
    constructor();
    Build(name: string, properties?: Partial<UINode>): UINode;
}
/**
 * @summary
 * create a layout, alternativley known as a div.
 *
 * @description
 * It accepts children and has a type, the type describes how
 * children are laid out in the space, so
 * as the available methods in the layout.
 * the options parameter takes in descriptions of how
 * children will be aligned, and the properties of the layout
 * these are like making it scrollable or fill in the x or y
 * direction.
 * @param type
 * @param options
 * @param props
 */
export declare const CreateLayout: (type: string, options: string, props?: Partial<WidgetProps>) => UINode;
/**
 * @summary
 * add a button to a parent widget.
 *
 * @description
 * It accepts the text-content of the button and WidgetProperties
 * as the second parameter.
 * Widget properties have partial and in-partial properties.
 *
 * Rely on the LSP to view these, but a parent is a must, an id too
 * is a must but if you dont provide one we will asign one
 * automatically.
 * @param text
 * @param props
 */
export declare const Button: (text: string, props?: WidgetProps) => UINode;
/**
 * @summary
 * add an image to your parent widget.
 *
 * @description
 * the first parameter 'src' is the source url of the image, and the
 * second follows our global Widget Properties.
 * @param src

 */
export declare const Image: (src: string, props: WidgetProps) => UINode;
