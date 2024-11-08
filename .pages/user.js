import { $component, $layout } from "rosana";

export const userPage = $layout("linear", "fillxy");
let txt = $component("p", userPage);

userPage.updateParams = (params) => {
    txt.element.textContent = params.id;
};
