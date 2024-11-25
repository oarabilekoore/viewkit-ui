import { $Layout, $Button } from "droidscript-native-for-web";

const homePage = $Layout("linear", "fillxy, top");

const NavigationBar = $Layout("linear", "fillx, vcenter");
NavigationBar.SetSize(null, 52, "px");
NavigationBar.SetBackColor("red");
homePage.AddChild(NavigationBar);

const View = $Layout("linear", "fillxy, vcenter");
homePage.AddChild(View);

const Button = $Button(View, "Hello World", 0.5, -1);
Button.SetOnTouch(function () {
    alert("Hello World");
});

export default homePage;
