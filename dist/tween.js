import { Tween, Easing } from "@tweenjs/tween.js";
function resolveEasing(type) {
    const easingParts = type.split(".");
    let easingFn = Easing;
    for (let part of easingParts) {
        easingFn = easingFn[part];
    }
    return easingFn;
}
/**
 * Move objects with easing applied and available effects, uses Tween.js
 * Check out docs at : (Tween.js Github)[https://github.com/tweenjs/tween.js]
 * @param object
 * @param tweenProperties
 */
const $Tween = function (object, tweenProperties) {
    const easingFn = resolveEasing(tweenProperties?.easing);
    const defaultPosition = { x: 0, y: 0 };
    const tween = new Tween(defaultPosition)
        .to(tweenProperties?.target, tweenProperties?.duration)
        .easing(easingFn)
        .onUpdate(() => {
        object?.element.style.setProperty("transform", "translate(" + defaultPosition.x + "px, " + defaultPosition.y + "px)");
    })
        .start();
    animate(0);
    function animate(time) {
        requestAnimationFrame(animate);
        tween.update(time);
    }
};
export default $Tween;
