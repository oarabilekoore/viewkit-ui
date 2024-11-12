import { navigationBar } from "./.ui/navigation.js";
import { outlinedButton } from "./.ui/buttons.js";
import { $LinearLayout, $Html } from "rosana";

const aboutPage = $LinearLayout("fillxy, top");

navigationBar(aboutPage);

let contentLayout = $LinearLayout("fillxy, vcenter");
aboutPage.addChild(contentLayout);

let text = $Html.H1(contentLayout);
text.batch({ textContent: "A very weird framework" });

let btn = outlinedButton(contentLayout, "The About Page");

btn.onclick = () => {
    app.router.navigate("/user/:id", { id: "Oara" });
};

export default aboutPage;
