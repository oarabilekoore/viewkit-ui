import { outlinedButton } from "../.ui/buttons";
import { $LinearLayout, $Animate } from "rosana";

const homePage = $LinearLayout("fillxy, vcenter");

let btn = outlinedButton(homePage, "Hello World");
btn.onclick = () => {
    $Animate(btn, "wobble", () => {
        app.router.navigate("/about");
    });
};

export default homePage;
