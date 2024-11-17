import { Tween, Easing } from "@tweenjs/tween.js";
import { componentController } from "../dist/control";

type EasingFunction = (amount: number) => number;
interface tweenProperties {
    easing: string;
    target: object;
    duration: number;
}

function resolveEasing(type: string): EasingFunction {
    const easingParts = type.split(".");
    let easingFn: any = Easing;

    for (let part of easingParts) {
        easingFn = easingFn[part];
    }

    return easingFn as EasingFunction;
}

/**
 * Move objects with easing applied and available effects, uses Tween.js
 * Check out docs at : (Tween.js Github)[https://github.com/tweenjs/tween.js]
 * @param object
 * @param tweenProperties
 */
export const $Tween = function (object: componentController, tweenProperties: tweenProperties) {
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

    function animate(time: number) {
        requestAnimationFrame(animate);
        tween.update(time);
    }
};
