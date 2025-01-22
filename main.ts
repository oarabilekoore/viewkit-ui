import { ui } from "droidxl";

function OnStart() {
    var main = ui.CreateLayout("linear", "center,fillxy");
    var btn = ui.CreateButton("Hello World");
    main.AddChild(btn);
    ui.AddLayout(main);
}

OnStart();
