/** * showIF method allows you to hide or show an element if the restingParameter is truthy */
const $showIF = function (restingParameter, onTruthyElement, onFalseyElement) {
    if (onTruthyElement === undefined || onFalseyElement === undefined) {
        console.error(`showIF not called, one of the elements is undefined`);
        return;
    }
    restingParameter ? onTruthyElement.showEl() : onTruthyElement.hideEl();
    !restingParameter ? onFalseyElement.showEl() : onFalseyElement.hideEl();
};
export default $showIF;
