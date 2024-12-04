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
