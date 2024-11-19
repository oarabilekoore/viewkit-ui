import type { rosanaComponent } from "./control.js";
import { $Element } from "./elements.js";
declare const $Html: Record<string, (parent: rosanaComponent, tag?: string) => InstanceType<typeof $Element>>;
export default $Html;
