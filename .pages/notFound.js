import { navigationBar } from "./.ui/navigation.js";
import { outlinedButton } from "./.ui/buttons.js";
import { $LinearLayout, $Html } from "rosana";

const aboutPage = $LinearLayout("fillxy, top");

navigationBar(aboutPage);

let contentLayout = $LinearLayout("fillxy, vcenter");
aboutPage.addChild(contentLayout);

$Html.P(contentLayout).batch({
    textContent: "That page dont exist bro",
});

let btn = outlinedButton(contentLayout, "Go To Home Page");
btn.onclick = () => {
    app.router.navigate("/");
};

export default aboutPage;
