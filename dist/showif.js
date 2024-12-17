/**
 * The `showIF` function conditionally shows or hides two elements based on a truthy or falsy value.
 * It takes a boolean `restingParameter` to determine which element to Show or Hide.
 *
 * - If `restingParameter` is truthy, the `onTruthyElement` is shown and `onFalseyElement` is hidden.
 * - If `restingParameter` is falsy, the `onFalseyElement` is shown and `onTruthyElement` is hidden.
 *
 * @param {boolean} restingParameter - The condition to determine which element should be shown or hidden.
 *                                    If truthy, the first element is shown, and the second is hidden.
 * @param {Widget} onTruthyElement - The component to Show when `restingParameter` is truthy.
 * @param {Widget} onFalseyElement - The component to Show when `restingParameter` is falsy.
 *
 * @throws {Error} If either `onTruthyElement` or `onFalseyElement` is `undefined`, an error is logged.
 */
const showIF = function (restingParameter, onTruthyElement, onFalseyElement) {
    // if (onTruthyElement === undefined || onFalseyElement === undefined) {
    //     console.error(`one of the elements is undefined on showIF`);
    //     return;
    // }
    // restingParameter ? onTruthyElement.Show() : onTruthyElement.Hide();
    // !restingParameter ? onFalseyElement.Show() : onFalseyElement.Hide();
};
export default showIF;
