import { navigationBar } from "./.ui/navigation.js";
import { outlinedButton } from "./.ui/buttons.js";
import { $LinearLayout } from "rosana";

const aboutPage = $LinearLayout("fillxy, top");

navigationBar(aboutPage);

let contentLayout = $LinearLayout("fillxy, vcenter");
aboutPage.addChild(contentLayout);

let btn = outlinedButton(contentLayout, "The About Page");
btn.on("click", () => {
    app.router.navigate("/user/:id", { id: "Oarabile" });
});

export default aboutPage;
