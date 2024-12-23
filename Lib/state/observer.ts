function makeThisObservable(target: any) {
    const observingFunctions: Function[] = [];

    return new Proxy(target, {
        set(target, property, value, receiver) {
            if (target[property] !== value) {
                observingFunctions.forEach((observer) => {
                    observer(property, value);
                });
            }
            return Reflect.set(target, property, value, receiver);
        },
        get(target, property, receiver) {
            if (property === "observe") {
                return function (observer: Function) {
                    observingFunctions.push(observer);
                };
            }
            return Reflect.get(target, property, receiver);
        },
    });
}

export { makeThisObservable };
