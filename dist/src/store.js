/**
 * Creates a reactive store that holds an object as its state.
 * The store uses a `Proxy` to enable reactivity, notifying subscribers when the state changes.
 *
 * @param {object} initialValue - The initial state of the store, which must be an object.
 * @returns {object} The store object containing methods to get, set, subscribe to, and retrieve the state.
 *
 * The store provides the following methods:
 * 1. `get(key)` - Get a property value from the state.
 * 2. `set(key, value)` - Set a property value in the state and notify subscribers of the change.
 * 3. `subscribe(listener)` - Subscribe to changes in the state. Returns a function to unsubscribe.
 * 4. `getState()` - Get a copy of the entire state object.
 */
const store = function (initialValue) {
    const listeners = new Set();
    /**
     * Notifies all subscribed listeners of the state change.
     * Creates a shallow copy of the state to avoid direct mutation by listeners.
     */
    const notify = () => {
        listeners.forEach((listener) => listener({ ...state }));
    };
    // Create a Proxy to track changes to the state object and notify listeners
    const state = new Proxy({ ...initialValue }, {
        /**
         * Intercepts state property updates. If a value changes, the proxy notifies listeners.
         *
         * @param {object} target - The target state object.
         * @param {string | symbol} key - The property key to set.
         * @param {any} value - The value to set for the property.
         * @returns {boolean} `true` if the operation was successful.
         */
        set(target, key, value) {
            //@ts-ignore
            if (target[key] !== value) {
                //@ts-ignore
                target[key] = value;
                notify();
            }
            return true;
        },
        /**
         * Intercepts state property access. Retrieves the value for a specified key.
         *
         * @param {object} target - The target state object.
         * @param {string | symbol} key - The property key to retrieve.
         * @returns {any} The value of the property.
         */
        get(target, key) {
            //@ts-ignore
            return target[key];
        },
    });
    return {
        /**
         * Gets the value of a specific property in the store's state.
         *
         * @param {string} key - The property key to get.
         * @returns {any} The value of the specified property in the state.
         */
        get(key) {
            //@ts-ignore
            return state[key];
        },
        /**
         * Sets the value of a specific property in the store's state.
         * This also notifies all subscribers about the state change.
         *
         * @param {string} key - The property key to set.
         * @param {any} value - The new value for the specified property.
         */
        set(key, value) {
            //@ts-ignore
            state[key] = value;
        },
        /**
         * Subscribes to changes in the store's state.
         * When the state changes, the listener function will be invoked with the updated state.
         *
         * @param {Function} listener - The callback function to execute when the state changes.
         * @returns {Function} A function that can be called to unsubscribe the listener.
         */
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        /**
         * Retrieves a shallow copy of the entire state object.
         *
         * @returns {object} A shallow copy of the state object.
         */
        getState() {
            return { ...state };
        },
    };
};
export default store;
