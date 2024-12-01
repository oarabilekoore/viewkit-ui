import { Layout, Button, Slider, ProgressBar } from "rosana";

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
    btn.SetHtml`<span>Newly Added</span>`;
    btn.SetId`random-new-id`;
});

const ck = new ProgressBar(View, 40, 100);

export default homePage;
