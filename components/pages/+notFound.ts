import { PageLayout, Button, Text } from "rosana";

const aboutPage = new PageLayout("linear", "fillxy, vcenter");
aboutPage.SetBackColor("yellow");

const description = Text(aboutPage);
description.SetText(`
    Couldnt Find That Page
`);

const goBackBtn = Button(aboutPage, "Go Back");
goBackBtn.SetOnTouch(() => {
    globalThis.app.router.navigate("./");
});
export default aboutPage;
