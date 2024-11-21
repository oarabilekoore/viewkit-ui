import { $Layout, $Animate } from "rosana";
import { Button } from "../.ui/buttons";

const homePage = $Layout.Linear("fillxy, vcenter");

let btn = Button(homePage, "Hello World");
btn.ontouch = () => {
    console.log(btn.textContent);
    $Animate(btn, "wobble", () => {
        app.router.navigate("/about");
    });
};

export default homePage;
