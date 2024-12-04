/**
 * create a signal, it takes in a default value with the type of any
 * it returns these functions : a setter/ getter of value and a
 * subscribe function.
 */
declare const Signal: (defaultValue: any) => {
    /** set the signal's value.*/
    value: any;
    /** subscribe to the signal.*/
    subscribe(fn: Function): () => void;
};
export default Signal;
