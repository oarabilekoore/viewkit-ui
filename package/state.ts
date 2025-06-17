export interface Signal<T> {
    get: () => T;
    set: (new_value: T) => void;
    subscribe: (fn: Function) => void;
}

/**
 * A signal is a reactive primitive that allows you to create a stateful value
 * that can be observed and updated. It is similar to a reactive variable in
 * other reactive programming libraries.
 * You tie the reactive variable to a function that will be called whenever the
 * value changes, allowing you to create reactive components that update
 * automatically when the state changes. This is done by using the effect
 * function.
 * @param default_value
 */
export function signal<T>(default_value: T): Signal<T> {
    const subscribers = new Set<Function>();
    let inner_value = default_value;

    function change_notifier() {
        subscribers.forEach((fn) => {
            fn(inner_value);
        });
    }

    const signalObj = {
        get: function (): T {
            if (currentEffect) {
                // If there's an effect currently running, subscribe it to this signal
                // so it gets re-run when this signal changes.
                signalObj.subscribe(currentEffect);
            }
            return inner_value;
        },
        set: (new_value: T): void => {
            inner_value = new_value;
            change_notifier();
        },
        subscribe: (fn: Function) => {
            subscribers.add(fn);
        },
    };

    return signalObj;
}

// A global stack to keep track of the currently running effect.
// This is crucial for automatic dependency tracking in `computed`.
let currentEffect: Function | null = null;

/**
 * An effect is a function that is executed whenever the state of a signal
 * changes. It allows you to create reactive components that update
 * automatically when the state changes.
 * You can pass in a list of signals that the effect should depend on, and
 * whenever any of those signals change, the effect will be executed.
 * If no dependencies are provided, the effect will be executed immediately.
 * @param fn
 * @param dependencies
 */
export function effect(fn: Function, dependencies?: Array<Signal<any>>) {
    if (typeof fn !== "function") {
        throw Error(`Effect cannot be instantiated because; ${fn} is not a function.`);
    }

    const executeEffect = () => {
        currentEffect = executeEffect;
        try {
            fn();
        } finally {
            currentEffect = null;
        }
    };

    // If dependencies are provided, use manual subscription
    if (dependencies && dependencies.length > 0) {
        dependencies.forEach((dep) => {
            dep.subscribe(executeEffect);
        });
        executeEffect();
    } else {
        // If no dependencies, rely on automatic dependency tracking
        executeEffect();
    }
}

/**
 * Creates a signal whose value is computed from other signals.
 * It automatically re-computes when its dependencies change.
 * @param computeFn The function to compute the value.
 * @returns A read-only signal.
 */
export function computed<T>(computeFn: () => T): Signal<T> {
    const computedSignal = signal<T>(computeFn());

    // Use effect without dependencies to enable automatic dependency tracking
    effect(() => {
        const newValue = computeFn();
        if (newValue !== computedSignal.get()) {
            computedSignal.set(newValue);
        }
    });

    return {
        get: computedSignal.get,
        set: () => {
            throw new Error("Cannot set value on computed signal");
        },
        subscribe: computedSignal.subscribe,
    };
}
