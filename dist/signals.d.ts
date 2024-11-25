/*** Create a strongly reactive signal with setters and getters.*/
export declare const signal: (defaultValue: any) => {
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
export declare const store: (initialValue: object) => {
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
