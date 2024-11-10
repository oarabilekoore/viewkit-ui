import { $Element, $LinearLayout } from "rosana";

const userPage = $LinearLayout("fillxy");
let txt = $Element("p", userPage);

userPage.routingInfo = (params) => {
    txt.element.textContent = params.id;
};

export default userPage;
