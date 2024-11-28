import { Layout, Button, Text } from "rosana";

const aboutPage = new Layout("linear", "fillxy, vcenter");
aboutPage.SetBackColor("yellow");

const description = new Text(aboutPage);
description.SetText(`
    Couldnt Find That Page
`);

const goBackBtn = new Button(aboutPage, "Go Back");
goBackBtn.SetOnTouch(() => {
    app.router.navigate("./");
});
export default aboutPage;
