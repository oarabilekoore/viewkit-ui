/**
 * Creates a signal, which is a reactive value that can be observed and updated.
 *
 * @param {T} defaultValue - The initial value of the signal.
 * @returns {Signal<T>} The signal object with getter, setter, and subscribe functions.
 *
 * A signal provides:
 * 1. A getter to retrieve the current value.
 * 2. A setter to update the value and notify all subscribers.
 * 3. A subscribe function to allow a function to listen for changes.
 */
const signal = function (defaultValue) {
    let internalVariable = defaultValue;
    let subscriptions = [];
    /**
     * Notifies all subscribers of the current value.
     */
    const notify = () => {
        for (let subscriber of subscriptions) {
            subscriber(internalVariable);
        }
    };
    return {
        /**
         * Sets the value of the signal and notifies all subscribers.
         *
         * @param {T} val - The new value to set.
         */
        set value(val) {
            internalVariable = val;
            notify();
        },
        /**
         * Gets the current value of the signal.
         *
         * @returns {T} The current value of the signal.
         */
        get value() {
            return internalVariable;
        },
        /**
         * Subscribes to changes in the signal's value.
         *
         * @param {Subscriber<T>} fn - The function to be called when the value changes.
         * @returns {Function} A function to unsubscribe the listener.
         *
         * The subscribe function adds the subscriber to the list, and the returned function
         * can be used to unsubscribe.
         */
        subscribe(fn) {
            subscriptions.push(fn);
            return () => {
                subscriptions = subscriptions.filter((sub) => sub !== fn);
            };
        },
    };
};
export { signal };
