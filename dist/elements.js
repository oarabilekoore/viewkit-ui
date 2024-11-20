import { componentController } from "./control.js";
export class $Element extends componentController {
    type;
    parent;
    constructor(tag, parent) {
        super();
        this.type = tag.toUpperCase();
        this.parent = parent;
        this.element = document.createElement(tag);
        this.element.id = crypto.randomUUID();
        parent.addChild(this);
        const handler = {
            get(obj, prop) {
                if (prop in obj) {
                    return obj[prop];
                }
                else {
                    return obj.element[prop];
                }
            },
            set(obj, prop, value) {
                if (prop in obj) {
                    obj[prop] = value;
                }
                else {
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
