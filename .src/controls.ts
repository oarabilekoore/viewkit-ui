import type { Layout } from "./types";
import { Button } from "./elements";

export const $Button = function (parent: Layout, text: string, width: number, height: number, options: string) {
    return new Button(parent, text, width, height, options);
};
