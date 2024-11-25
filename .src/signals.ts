/*** Create a strongly reactive signal with setters and getters.*/
export const signal = function (defaultValue: any) {
    let internalVariable = defaultValue;
    let subscriptions: Array<Function> = [];

    const notify = () => {
        for (let subscriber of subscriptions) {
            subscriber(internalVariable);
        }
    };

    return {
        /**
         * Set the signal's value.
         */
        set value(val: any) {
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
        subscribe(fn: Function) {
            subscriptions.push(fn);
            return () => {
                subscriptions = subscriptions.filter((sub) => sub !== fn);
            };
        },
    };
};

/*** Create a reactive store using a Proxy to automatically track and notify changes.*/
export const store = function (initialValue: object) {
    const listeners: Set<Function> = new Set();

    const notify = () => {
        listeners.forEach((listener) => listener({ ...state }));
    };

    const state = new Proxy(
        { ...initialValue },
        {
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
        }
    );

    return {
        /**
         * Get a property from the store's state.
         */
        get(key: any) {
            //@ts-ignore
            return state[key];
        },

        /**
         * Set a property in the store's state.
         */
        set(key: any, value: any) {
            //@ts-ignore
            state[key] = value;
        },

        /**
         * Subscribe to changes in the store's state.
         * Returns an unsubscribe function to remove the subscription.
         */
        subscribe(listener: Function) {
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
