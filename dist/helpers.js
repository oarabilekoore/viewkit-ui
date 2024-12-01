export const generateId = function () {
    return `rs-${Math.random().toString(36).substr(2, 9)}`;
};
export const generateClassName = function () {
    return `rs-${Math.random().toString(36).substr(2, 9)}`;
};
// Allows me to provide better Errors to the Developer.
export const debugInfo = function (title, source, debugObject) {
    let template = `rosana.js Error : ${title}\n
    The Following Debug Info Has Been Provided By ${source}\n
    Is HTMLELement : ${debugObject instanceof HTMLElement}\n
    Object Keys : ${Object.keys(debugObject)}\n
    Object Values : ${Object.values(debugObject)}`;
    throw Error(template);
};
// This ratio class is useful for getting the screen size ratio to the
// used DroidScript Sizing of Controls
export class Ratio {
    consequent;
    antecedent;
    constructor(antecedent, consequent) {
        this.consequent = consequent;
        this.antecedent = antecedent;
    }
    getFirstToSecond(antecedentReliantValue) {
        return (antecedentReliantValue * this.consequent) / this.antecedent;
    }
    getSecondToFirst(consequentReliantValue) {
        return (consequentReliantValue * this.antecedent) / this.consequent;
    }
}
export function dimensioningWidthFn(value) {
    const innerWidth = window.innerWidth;
    let ratio = new Ratio(1, innerWidth);
    return ratio.getFirstToSecond(value);
}
export function dimensioningHeightFn(value) {
    const innerHeight = window.innerHeight;
    let ratio = new Ratio(1, innerHeight);
    return ratio.getFirstToSecond(value);
}
