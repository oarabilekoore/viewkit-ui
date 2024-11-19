import "animate.css";
import type { rosanaComponent } from "./control";
/**
 * Animate an element, powerd by Animate.css
 */
declare const $Animate: (object: rosanaComponent, animationName: string, onAnimationEndFunction: Function) => void;
export default $Animate;
