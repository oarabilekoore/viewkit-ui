// create a signal, it takes in a default value with the type of any
// it returns these functions : a setter/ getter of value and a
// subscribe function.
export const signal = function (defaultValue) {
    let internalVariable = defaultValue;
    let subscriptions = [];
    const notify = () => {
        for (let subscriber of subscriptions) {
            subscriber(internalVariable);
        }
    };
    return {
        /** set the signal's value.*/
        set value(val) {
            internalVariable = val;
            notify();
        },
        /** get the signal's value.*/
        get value() {
            return internalVariable;
        },
        /** subscribe to the signal.*/
        subscribe(fn) {
            subscriptions.push(fn);
            return () => {
                subscriptions = subscriptions.filter((sub) => sub !== fn);
            };
        },
    };
};
// create a signal which takes in its defaultValue as an Object,
// it uses a Proxy which will be used for the reactivity and
// returns a get / set / getState and subscribe Function.
export const store = function (initialValue) {
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
        /** get a property from the store's state.*/
        get(key) {
            //@ts-ignore
            return state[key];
        },
        /** set a property in the store's state.*/
        set(key, value) {
            //@ts-ignore
            state[key] = value;
        },
        /** subscribe to changes in the store's state.*/
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        /** get the entire state object.*/
        getState() {
            return { ...state };
        },
    };
};
