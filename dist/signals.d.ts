/**
 * create a reactive value by using setters and getters.
 */
export declare const $signal: (defaultValue: any) => {
    /**
     * set the signal's value
     */
    value: any;
    /**
     * subscribe to the signal
     */
    subscribe: (fn: Function) => void;
};
/**
 * add a signal that takes in the defaultValue as an object
 */
export declare const $store: (initialValue: object) => {
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
