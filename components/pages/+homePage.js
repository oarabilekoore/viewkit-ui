import { PageLayout, Button } from "rosana";

const homePage = new PageLayout("linear", "fillxy, top");
homePage.SetBackColor("green");

const NavigationBar = new PageLayout("linear", "fillx");
NavigationBar.SetBackColor("white");
NavigationBar.SetSize(null, 52, "px");

homePage.AddChild(NavigationBar);

const View = new PageLayout("linear", "fillxy, vcenter");
View.SetBackColor("orange");
homePage.AddChild(View);

const btn = Button(View, "Hello World", 0.08, -1);
btn.SetOnTouch(function () {
    btn.SetHtml`<span>Newly Added</span>`;
    btn.SetId`random-new-id`;
});

export default homePage;
