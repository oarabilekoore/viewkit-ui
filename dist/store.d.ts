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
