/**
 * create a reactive value by using setters and getters.
 */
export const $signal = function (defaultValue: any) {
    let internal_variable = defaultValue;
    let subscriptions: Array<Function> = [];

    const notify = function () {
        for (let subscriber of subscriptions) {
            subscriber(internal_variable);
        }
    };
    return {
        /**
         * set the signal's value
         */
        set value(val: any) {
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
        subscribe: (fn: Function) => {
            subscriptions.push(fn);
        },
    };
};

/**
 * add a signal that takes in the defaultValue as an object
 */
export const $store = function (initialValue: object) {
    let state: any = { ...initialValue };
    const listeners: Set<Function> = new Set();

    return {
        /**
         * set the signal's value
         */
        set(key: any, value: any) {
            state[key] = value;
            listeners.forEach((listener) => listener(state));
        },

        /**
         * returns the signals value
         */
        get(key: any) {
            return state[key];
        },

        /*** subscribe to the signal */
        subscribe(listener: Function) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
};
