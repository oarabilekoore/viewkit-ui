import { Button } from "./elements";
export const $Button = function (parent, text, width, height, options) {
    return new Button(parent, text, width, height, options);
};
