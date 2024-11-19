import { componentController } from "./control";
interface tweenProperties {
    easing: string;
    target: object;
    duration: number;
}
/**
 * Move objects with easing applied and available effects, uses Tween.js
 * Check out docs at : (Tween.js Github)[https://github.com/tweenjs/tween.js]
 * @param object
 * @param tweenProperties
 */
declare const $Tween: (object: componentController, tweenProperties: tweenProperties) => void;
export default $Tween;
