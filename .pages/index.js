import { outlinedButton } from "./.ui/buttons.js";
import { navigationBar } from "./.ui/navigation.js";
import { $LinearLayout } from "rosana";

const homePage = $LinearLayout("top, scrolly, fillxy, noscrollbar");

navigationBar(homePage);

let contentLayout = $LinearLayout("fillxy, vcenter");
homePage.addChild(contentLayout);

let btn = outlinedButton(contentLayout, "Hello World");
btn.on("click", () => {
    app.router.navigate("/about");
});

export default homePage;
