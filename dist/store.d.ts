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
declare const store: (initialValue: object) => {
    /**
     * Gets the value of a specific property in the store's state.
     *
     * @param {string} key - The property key to get.
     * @returns {any} The value of the specified property in the state.
     */
    get(key: any): any;
    /**
     * Sets the value of a specific property in the store's state.
     * This also notifies all subscribers about the state change.
     *
     * @param {string} key - The property key to set.
     * @param {any} value - The new value for the specified property.
     */
    set(key: any, value: any): void;
    /**
     * Subscribes to changes in the store's state.
     * When the state changes, the listener function will be invoked with the updated state.
     *
     * @param {Function} listener - The callback function to execute when the state changes.
     * @returns {Function} A function that can be called to unsubscribe the listener.
     */
    subscribe(listener: Function): () => boolean;
    /**
     * Retrieves a shallow copy of the entire state object.
     *
     * @returns {object} A shallow copy of the state object.
     */
    getState(): {};
};
export default store;
