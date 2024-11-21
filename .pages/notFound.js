import { navigationBar } from "./.ui/navigation.js";
import { outlinedButton } from "./.ui/buttons.js";
import { $Layout, $Html } from "rosana";

const aboutPage = $Layout.Linear("fillxy, top");

navigationBar(aboutPage);

let contentLayout = $Layout.Linear("fillxy, vcenter");
aboutPage.addChild(contentLayout);

$Html.P(contentLayout).batch({
    textContent: "That page dont exist bro",
});

let btn = outlinedButton(contentLayout, "Go To Home Page");
btn.onclick = () => {
    app.router.navigate("/");
};

export default aboutPage;
