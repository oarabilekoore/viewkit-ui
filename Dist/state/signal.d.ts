import type { Signal } from "../global";
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
declare const signal: <T>(defaultValue: T) => Signal<T>;
export { signal };
