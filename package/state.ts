type Signal<T> = {
    get: () => T;
    set: (new_value: T) => void;
    subscribe: (fn: Function) => void;
};

export function $signal<T>(default_value: T): Signal<T> {
    var subscribers: Array<Function> = [];
    var inner_value = default_value as T;

    function change_notifier() {
        subscribers.forEach((fn) => {
            fn(inner_value);
        });
    }

    return {
        get: function (): T {
            return inner_value;
        },
        set: (new_value: T): void => {
            inner_value = new_value;
            change_notifier();
        },
        subscribe: (fn: Function) => {
            subscribers.push(fn);
        },
    };
}
