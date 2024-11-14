/**
 * create a reactive value by using setters and getters.
 */
export const $signal = function (defaultValue) {
    let internal_variable = defaultValue;
    let subscriptions = [];
    const notify = function () {
        for (let subscriber of subscriptions) {
            subscriber(internal_variable);
        }
    };
    return {
        /**
         * set the signal's value
         */
        set value(val) {
            internal_variable = val;
            notify();
        },
        /**
         * returns the signals value
         */
        get value() {
            return internal_variable;
        },
        /**
         * subscribe to the signal
         */
        subscribe: (fn) => {
            subscriptions.push(fn);
        },
    };
};
/**
 * add a signal that takes in the defaultValue as an object
 */
export const $store = function (initialValue) {
    let state = { ...initialValue };
    const listeners = new Set();
    return {
        /**
         * set the signal's value
         */
        set(key, value) {
            state[key] = value;
            listeners.forEach((listener) => listener(state));
        },
        /**
         * returns the signals value
         */
        get(key) {
            return state[key];
        },
        /*** subscribe to the signal */
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
};
