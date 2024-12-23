// @ts-nocheck
function makeThisObservable(target) {
    const observingFunctions = [];
    target.observe = function (observer) {
        observingFunctions.push(observer);
    };
    const handler = {
        set(target, properties, value, reciever) {
            observingFunctions.forEach((observer) => {
                observer(properties, value);
            });
            return Reflect.set(...arguments);
        },
    };
    return new Proxy(target, handler);
}
export { makeThisObservable };
