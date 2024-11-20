import { outlinedButton } from "../.ui/buttons";
import { $LinearLayout, $Animate } from "rosana";

const homePage = $LinearLayout("fillxy, vcenter");

let btn = outlinedButton(homePage, "Hello World");
btn.ontouch = () => {
    btn.console.log(btn.textContent);
    $Animate(btn, "wobble", () => {
        app.router.navigate("/about");
    });
};

export default homePage;
