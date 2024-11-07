/**
 * signal Method allows you to use plain signals, it takes in plain values and gives reactivity.
 * @param {any} defaultValue
 */
export const $signal = function (defaultValue = null) {
    let internal_variable = defaultValue;
    let subscriptions = [];

    /**
     * notify the user
     * @param {Function} fn
     */
    const notify = function (fn) {
        for (let subscriber of subscriptions) {
            subscriber(internal_variable);
        }
    };
    return {
        /**
         * set the signal's value
         * @param {any} val
         */
        set value(val) {
            internal_variable = val;
            notify();
        },

        /**
         * returns the signals value
         * @returns internal_variable
         */
        get value() {
            return internal_variable;
        },

        /**
         * subscribe to the signal
         * @param {Function} fn
         */
        subscribe: (fn) => {
            subscriptions.push(fn);
        },
    };
};

/**
 * add a signal that takes in the defaultValue as an object
 * @param {Object} initialValue = {}
 */
export const $store = function (initialValue = {}) {
    let state = { ...initialValue };
    const listeners = new Set();

    return {
        /**
         * set the signal's value
         * @param {any} val
         */
        set(key, value) {
            state[key] = value;
            listeners.forEach((listener) => listener(state));
        },

        /**
         * returns the signals value
         * @returns internal_variable
         */
        get(key) {
            return state[key];
        },

        /**
         * subscribe to the signal
         * @param {Function} fn
         */
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
};
