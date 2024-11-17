import { componentController } from "./control.js";
import { $Element } from "./elements.js";
export declare const $Html: Record<string, (parent: componentController, tag: string) => InstanceType<typeof $Element>>;
