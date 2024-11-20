import { componentController } from "./control.js";
import type { rosanaComponent } from "./control.js";
export type HtmlTag = string;

export class $Element extends componentController {
    type: HtmlTag;
    parent: rosanaComponent;

    constructor(tag: HtmlTag, parent: rosanaComponent) {
        super();

        this.type = tag.toUpperCase() as HtmlTag;
        this.parent = parent;

        this.element = document.createElement(tag);
        this.element.id = crypto.randomUUID();

        parent.addChild(this);

        const handler: ProxyHandler<this> = {
            get(obj, prop) {
                if (prop in obj) {
                    return obj[prop as keyof $Element];
                } else {
                    return obj.element[prop as keyof HTMLElement];
                }
            },
            set(obj, prop, value) {
                if (prop in obj) {
                    (obj as any)[prop] = value;
                } else {
                    //@ts-ignore
                    obj.element[prop] = value;
                }
                return true;
            },
        };
        const proxy = new Proxy(this, handler);
        return proxy;
    }
}
