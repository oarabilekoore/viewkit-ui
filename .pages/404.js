import { navigationBar } from "./.ui/navigation.js";
import { outlinedButton } from "./.ui/buttons.js";
import { $LinearLayout, $Element } from "rosana";

const aboutPage = $LinearLayout("fillxy, top");

navigationBar(aboutPage);

let contentLayout = $LinearLayout("fillxy, vcenter");
aboutPage.addChild(contentLayout);

$Element("p", contentLayout, {
    textContent: "That page dont exist bro",
});

let btn = outlinedButton(contentLayout, "Go To Home Page");
btn.on("click", () => {
    app.router.navigate("/");
});

export default aboutPage;
