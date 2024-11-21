import type { rosanaComponent } from "./types";

/** * showIF method allows you to hide or show an element if the restingParameter is truthy */
const $ShowIF = function (
    restingParameter: boolean,
    onTruthyElement: rosanaComponent,
    onFalseyElement: rosanaComponent
) {
    if (onTruthyElement === undefined || onFalseyElement === undefined) {
        console.error(`showIF not called, one of the elements is undefined`);
        return;
    }
    restingParameter ? onTruthyElement.show() : onTruthyElement.hide();
    !restingParameter ? onFalseyElement.show() : onFalseyElement.hide();
};

export default $ShowIF;
