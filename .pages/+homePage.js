import { $LinearLayout, $App } from "rosana";

const homePage = $LinearLayout("fillxy, vcenter");

let btn = $App.Button(homePage, "Hello World");
btn.onclick = () => app.router.navigate("/about");

export default homePage;
