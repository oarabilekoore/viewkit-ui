import { $Layout, $H2, $Tween } from "rosana";
import { Button } from "../.ui/buttons.js";

const aboutPage = $Layout.Linear("fillxy, vcenter");

$H2(aboutPage).batch({
    textContent: "Exploring JavaScript",
});

let btn = Button(aboutPage, "The About Page");

btn.ontouch = function () {
    $Tween(btn, {
        target: { x: 0, y: 250 },
        duration: 3000,
        easing: "Quadratic.InOut",
    });
};
export default aboutPage;
