import { $Layout, $Button, $Text } from "droidscript-native-for-web";

const homePage = $Layout.Linear("fillxy, top");

const NavigationBar = $Layout.Linear("fillx, vcenter");
NavigationBar.setSize(null, 52, "px");
NavigationBar.backColor = "red";
homePage.addChild(NavigationBar);

const title = $Text(NavigationBar);
title.text = "rosana.js";

const View = $Layout.Linear("fillxy, vcenter");
homePage.addChild(View);

const Button = $Button(View);
Button.onclick = function () {
    alert("Hello World");
};
Button.text = "Hello World";

export default homePage;
