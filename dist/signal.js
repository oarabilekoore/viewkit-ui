/**
 * create a signal, it takes in a default value with the type of any
 * it returns these functions : a setter/ getter of value and a
 * subscribe function.
 */
const Signal = function (defaultValue) {
    let internalVariable = defaultValue;
    let subscriptions = [];
    const notify = () => {
        for (let subscriber of subscriptions) {
            subscriber(internalVariable);
        }
    };
    return {
        /** set the signal's value.*/
        set value(val) {
            internalVariable = val;
            notify();
        },
        /** get the signal's value.*/
        get value() {
            return internalVariable;
        },
        /** subscribe to the signal.*/
        subscribe(fn) {
            subscriptions.push(fn);
            return () => {
                subscriptions = subscriptions.filter((sub) => sub !== fn);
            };
        },
    };
};
export default Signal;
