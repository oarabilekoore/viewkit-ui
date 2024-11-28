import { Layout, Button, Text } from "rosana";

const aboutPage = new Layout("linear", "fillxy, vcenter");
aboutPage.SetBackColor("yellow");

const description = new Text(aboutPage);
description.SetText(`
    Hello Welcome To The Rosana.JS AboutPage
`);

const goBackBtn = new Button(aboutPage, "Go Back");
goBackBtn.SetOnTouch(() => {
    app.router.back();
});
export default aboutPage;
