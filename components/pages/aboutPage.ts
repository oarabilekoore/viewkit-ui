import { PageLayout, Button, Text } from "rosana";

const aboutPage = new PageLayout("linear", "fillxy, vcenter");
aboutPage.SetBackColor("yellow");

const description = Text(aboutPage);
description.SetText(`
    Hello Welcome To The Rosana.JS AboutPage
`);

const goBackBtn = Button(aboutPage, "Go Back");
goBackBtn.SetOnTouch(() => {
    globalThis.app.router.back();
});
export default aboutPage;
