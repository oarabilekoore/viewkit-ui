import { Layout, Button } from "rosana";

const homePage = new Layout("linear", "fillxy, top");
homePage.SetBackColor("green");

const NavigationBar = new Layout("linear", "fillx");
NavigationBar.SetBackColor("white");
NavigationBar.SetSize(null, 52, "px");

homePage.AddChild(NavigationBar);

const View = new Layout("linear", "fillxy, vcenter");
View.SetBackColor("orange");
homePage.AddChild(View);

const btn = new Button(View, "Hello World", 0.08, -1);
btn.SetOnTouch(function () {
    app.router.navigate("/about");
});

export default homePage;
