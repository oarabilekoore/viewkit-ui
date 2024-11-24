/** * create a reactivley weak value by using setters and getters (weak signal)*/
export const $WeakSignal = function (defaultValue) {
    let internal_variable = defaultValue;
    let subscriptions = [];
    const notify = function () {
        for (let subscriber of subscriptions) {
            subscriber(internal_variable);
        }
    };
    return {
        /** * set the signal's value*/
        set value(val) {
            internal_variable = val;
            notify();
        },
        /** * returns the signals value*/
        get value() {
            return internal_variable;
        },
        /** * subscribe to the signal*/
        subscribe: (fn) => {
            subscriptions.push(fn);
        },
    };
};
/*** add a signal that takes in the defaultValue as an object*/
export const $WeakStore = function (initialValue) {
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
/*** Create a strongly reactive signal with setters and getters.*/
export const $Signal = function (defaultValue) {
    let internalVariable = defaultValue;
    let subscriptions = [];
    const notify = () => {
        for (let subscriber of subscriptions) {
            subscriber(internalVariable);
        }
    };
    return {
        /**
         * Set the signal's value.
         */
        set value(val) {
            internalVariable = val;
            notify();
        },
        /**
         * Get the signal's value.
         */
        get value() {
            return internalVariable;
        },
        /**
         * Subscribe to the signal.
         * Returns an unsubscribe function to remove the subscription.
         */
        subscribe(fn) {
            subscriptions.push(fn);
            return () => {
                subscriptions = subscriptions.filter((sub) => sub !== fn);
            };
        },
    };
};
/*** Create a reactive store using a Proxy to automatically track and notify changes.*/
export const $Store = function (initialValue) {
    const listeners = new Set();
    const notify = () => {
        listeners.forEach((listener) => listener({ ...state }));
    };
    const state = new Proxy({ ...initialValue }, {
        set(target, key, value) {
            //@ts-ignore
            if (target[key] !== value) {
                //@ts-ignore
                target[key] = value;
                notify();
            }
            return true;
        },
        get(target, key) {
            //@ts-ignore
            return target[key];
        },
    });
    return {
        /**
         * Get a property from the store's state.
         */
        get(key) {
            //@ts-ignore
            return state[key];
        },
        /**
         * Set a property in the store's state.
         */
        set(key, value) {
            //@ts-ignore
            state[key] = value;
        },
        /**
         * Subscribe to changes in the store's state.
         * Returns an unsubscribe function to remove the subscription.
         */
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        /**
         * Get the entire state object.
         */
        getState() {
            return { ...state };
        },
    };
};
