import { outlinedButton } from "../.ui/buttons";
import { $Layout, $Animate } from "rosana";

const homePage = $Layout.Linear("fillxy, vcenter");

let btn = outlinedButton(homePage, "Hello World");
btn.ontouch = () => {
    console.log(btn.textContent);
    $Animate(btn, "wobble", () => {
        app.router.navigate("/about");
    });
};

export default homePage;
