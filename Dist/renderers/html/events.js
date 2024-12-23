// We Write Our Own Custom Evenets For Interop With The
// Rosana Spec Here.
// This Map takes in an element's id and its handler Function
// It will monitor all clicks on the page and check if the target maps to the element,
// great as it reduces eventListeners = reduces memory usage
export const onPressEventHanlerMap = new Map();
document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target?.id && onPressEventHanlerMap.has(target.id)) {
        onPressEventHanlerMap.get(target.id)?.();
    }
});
// Extend the HTMLElement prototype to add the `onPress` setter.
Object.defineProperty(HTMLElement.prototype, "onpress", {
    set(handler) {
        if (this.id) {
            // Store the handler function in the map with the element's id
            onPressEventHanlerMap.set(this.id, handler);
        }
        else {
            console.error("Element must have an id to use onpress.");
        }
    },
});
