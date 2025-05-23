export function $signal(default_value) {
    var subscribers = [];
    var inner_value = default_value;
    function change_notifier() {
        subscribers.forEach((fn) => {
            fn(inner_value);
        });
    }
    return {
        get: function () {
            return inner_value;
        },
        set: (new_value) => {
            inner_value = new_value;
            change_notifier();
        },
        subscribe: (fn) => {
            subscribers.push(fn);
        },
    };
}
