type Signal<T> = {
    get: () => T;
    set: (new_value: T) => void;
    subscribe: (fn: Function) => void;
};
/**
 * Create reactive behaviour with any value type and on ui
 * @param default_value
 * @returns
 */
export declare function signal<T>(default_value: T): Signal<T>;
export {};
