import "animate.css";
import type { rosanaComponent } from "./types.js";
/**
 * Animate an element, powerd by Animate.css
 */
declare const $Animate: (object: rosanaComponent, animationName: string, onAnimationEndFunction: Function) => void;
export default $Animate;
