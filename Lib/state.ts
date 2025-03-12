
/**
 * useState, is a signal and allows you to subscribe to changes on a value
 * use the useEffect signal to run the function immediatley and on value 
 * change, 
 * use the useSubscriber  signal to only subscribe to changes.
 */
export default function state<T>(defaultState: T): [() => T, (value: T) => void, (fn: () => void) => void, (fn: () => void) => void] {
    let reactiveProperty: T = defaultState;
    const subscriptions: Array<() => void> = [];

    function callEffect() {
        for (const subscriber of subscriptions) {
            subscriber();
        }
    }

    function setState(value: T) {
        reactiveProperty = value;
        callEffect();
    }

    function getState(): T {
        return reactiveProperty;
    }

    function useEffect(fn: () => void) {
        subscriptions.push(fn);
        fn();
    }

    function useSubscriber(fn: () => void) {
        subscriptions.push(fn);
    }

    return [getState, setState, useEffect, useSubscriber];
}
