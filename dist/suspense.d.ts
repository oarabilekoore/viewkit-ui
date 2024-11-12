export function $showIF(restingParameter: boolean, onTruthyElement: instanceOf<$uiControl>, onFalseyElement: instanceOf<$uiControl>): void;
export function $suspense(resource: asyncFunction, fallback: instanceOf<$uiControl>, controlInSuspension: instanceOf<$uiControl>): {
    /**
     * call a function after the new view is added
     * @param {Function} fn
     */
    effects: (fn: Function) => number;
} | undefined;
