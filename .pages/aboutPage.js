import { $LinearLayout, $Html, $Tween } from "rosana";
import { outlinedButton } from "../.ui/buttons.js";

const aboutPage = $LinearLayout("fillxy, vcenter");

$Html.H2(aboutPage).batch({ textContent: "Exploring JavaScript" });

let btn = outlinedButton(aboutPage, "The About Page");
btn.onclick = function () {
    $Tween(btn, {
        target: { x: 0, y: 250 },
        duration: 3000,
        easing: "Quadratic.InOut",
    });
};
export default aboutPage;
