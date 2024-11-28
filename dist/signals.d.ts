export declare const signal: (defaultValue: any) => {
    /** set the signal's value.*/
    value: any;
    /** subscribe to the signal.*/
    subscribe(fn: Function): () => void;
};
export declare const store: (initialValue: object) => {
    /** get a property from the store's state.*/
    get(key: any): any;
    /** set a property in the store's state.*/
    set(key: any, value: any): void;
    /** subscribe to changes in the store's state.*/
    subscribe(listener: Function): () => boolean;
    /** get the entire state object.*/
    getState(): {};
};
