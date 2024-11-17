import { $LinearLayout, $App, $Tween } from "rosana";

const homePage = $LinearLayout("top, vcenter");

let btn = $App.Button(homePage, "Hello World");
btn.onclick = () => {
    $Tween(btn, { target: { x: 100, y: 100 }, duration: 100, easing: "Quadratic.InOut" });
};

export default homePage;
