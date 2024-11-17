import { Tween as TWEEN, Easing } from "@tweenjs/tween.js";
function resolveEasing(type) {
    const easingParts = type.split(".");
    let easingFn = Easing;
    for (let part of easingParts) {
        easingFn = easingFn[part];
    }
    return easingFn;
}
export const $Tween = function (object, tweenProperties) {
    const easingFn = resolveEasing(tweenProperties?.easing);
    const defaultPosition = { x: 0, y: 0 };
    const tween = new TWEEN(defaultPosition)
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
