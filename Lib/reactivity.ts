interface ReactiveValue<T> {
    value: T;
    subscribe: (subscriber: (value: T) => void) => void;
}

export function signal<T>(defaultValue: T): ReactiveValue<T> {
    var reactiveValue = defaultValue;
    const subscribers = Array();

    function call_subscriber() {
        for (const subscriber of subscribers) {
            subscriber(reactiveValue);
        }
    }

    function update_value(value: T) {
        reactiveValue = value;
        call_subscriber();
    }
    return {
        get value() {
            return reactiveValue;
        },
        set value(value: T) {
            update_value(value);
        },
        subscribe(subscriber: (value: T) => void) {
            subscribers.push(subscriber);
        },
    };
}
