export function $signal(defaultValue?: any): {
    /**
     * set the signal's value
     * @param {any} val
     */
    value: any;
    /**
     * subscribe to the signal
     * @param {Function} fn
     */
    subscribe: (fn: Function) => void;
};
export function $store(initialValue?: Object): {
    /**
     * set the signal's value
     * @param {any} val
     */
    set(key: any, value: any): void;
    /**
     * returns the signals value
     * @returns internal_variable
     */
    get(key: any): any;
    /**
     * subscribe to the signal
     * @param {Function} fn
     */
    subscribe(listener: any): () => boolean;
};
