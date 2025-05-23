type Signal<T> = {
    get: () => T;
    set: (new_value: T) => void;
    subscribe: (fn: Function) => void;
};
export declare function $signal<T>(default_value: T): Signal<T>;
export {};
