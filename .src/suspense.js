import { $createApp } from "./+reckt.core.js";
import { $error } from "./debugger.js";

/**
 * showIF method allows you to hide or show an element if the restingParameter is truthy
 * @param {Boolean} restingParameter
 * @param {instanceOf<$uiControl>} onTruthyElement
 * @param {instanceOf<$uiControl>} onFalseyElement
 */
export const $showIF = function (restingParameter, onTruthyElement, onFalseyElement) {
    if (onTruthyElement === undefined || onFalseyElement === undefined) {
        $error(`showIF not called, one of the elements is undefined`);
        return;
    }
    restingParameter ? onTruthyElement.show() : onTruthyElement.hide();
    !restingParameter ? onFalseyElement.show() : onFalseyElement.hide();
};

/**
 * show a fallback view during an async operation, then swap it out when done.
 * @param {asyncFunction} resource
 * @param {instanceOf<$uiControl>} fallback
 * @param {instanceOf<$uiControl>} controlInSuspension
 */
export const $suspense = (resource, fallback, controlInSuspension) => {
    const subscriptions = [];

    const notify = () => subscriptions.forEach((subscriber) => subscriber());

    if (fallback.type === "Layout" && controlInSuspension.type === "Layout") {
        if (!controlInSuspension.hasChild(fallback)) {
            $error(`FallBack is not a child of ${controlInSuspension}`);
            return;
        }

        app.mount(fallback);

        const showFallback = () => {
            fallback.show();
            controlInSuspension.hide();
        };

        const showSuspended = () => {
            controlInSuspension.show();
            fallback.hide();
        };

        showFallback();

        Promise.resolve(resource())
            .then(() => {
                showSuspended();
                notify();
            })
            .catch(() => showFallback());
    } else {
        $error("suspense must be used with both containers as a layout");
    }
    return {
        /**
         * call a function after the new view is added
         * @param {Function} fn
         */
        effects: (fn) => subscriptions.push(fn),
    };
};
