/** * create a reactivley weak value by using setters and getters (weak signal)*/
export declare const $WeakSignal: (defaultValue: any) => {
    /** * set the signal's value*/
    value: any;
    /** * subscribe to the signal*/
    subscribe: (fn: Function) => void;
};
/*** add a signal that takes in the defaultValue as an object*/
export declare const $WeakStore: (initialValue: object) => {
    /**
     * set the signal's value
     */
    set(key: any, value: any): void;
    /**
     * returns the signals value
     */
    get(key: any): any;
    /*** subscribe to the signal */
    subscribe(listener: Function): () => boolean;
};
/*** Create a strongly reactive signal with setters and getters.*/
export declare const $Signal: (defaultValue: any) => {
    /**
     * Set the signal's value.
     */
    value: any;
    /**
     * Subscribe to the signal.
     * Returns an unsubscribe function to remove the subscription.
     */
    subscribe(fn: Function): () => void;
};
/*** Create a reactive store using a Proxy to automatically track and notify changes.*/
export declare const $Store: (initialValue: object) => {
    /**
     * Get a property from the store's state.
     */
    get(key: any): any;
    /**
     * Set a property in the store's state.
     */
    set(key: any, value: any): void;
    /**
     * Subscribe to changes in the store's state.
     * Returns an unsubscribe function to remove the subscription.
     */
    subscribe(listener: Function): () => boolean;
    /**
     * Get the entire state object.
     */
    getState(): {};
};
