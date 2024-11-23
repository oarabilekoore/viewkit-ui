import { $Layout } from "rosana";

const NavigationBar = function (parent, title, icon) {
    const mainView = $Layout.Linear("fillx, center");
    mainView.setSize(null, 52, "px");
    mainView.backColor("red");

    parent.addChild(mainView);

    return mainView;
};

export default NavigationBar;
