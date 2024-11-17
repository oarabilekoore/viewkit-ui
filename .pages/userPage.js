import { $LinearLayout } from "rosana";
import { navigationBarB } from "./.ui/navigation.js";

const userPage = $LinearLayout("fillxy, top, scrollxy, noscrollbar");

let nav = navigationBarB(userPage);

userPage.routingInfo = (params) => {
    nav.name(`Hello ${params.id}`);
};

export default userPage;
