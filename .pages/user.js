import { $Element, $LinearLayout } from "rosana";

export const userPage = $LinearLayout("fillxy");
let txt = $Element("p", userPage);

userPage.updateParams = (params) => {
    txt.element.textContent = params.id;
};
