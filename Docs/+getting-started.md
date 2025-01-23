# droidxl Framework: Getting Started

droidxl is supposed to mimic the droidscript syntax but with a few changes to provide more functionality.

I assume you have installed the node module:

In droidxl we import all the controls we want to use and every control has three parameter's and the last
one being optional, except master controls:

```javascript
import { Layout, Button } from "droidxl";

const page = Layout("linear", "fillxy, center");
// Layout is a master control and doesnt abide to these rules.

const btn = Button("Hello World", page);
//or
const btn = Button("Hello World", page, {
    id: "hello-world-btn",
});

// To add the controls to the dom, you must bind the main layout:
page.BindPage();
```
