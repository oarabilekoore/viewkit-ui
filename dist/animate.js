import "animate.css";
/**
 * Animate an element, powerd by Animate.css
 */
const $Animate = function (object, animationName, onAnimationEndFunction) {
    let animation = `animate__${animationName}`;
    object.element.classList.add(`animate__animated`, animation);
    function handleAnimationEnd(event) {
        event.stopPropagation();
        onAnimationEndFunction ? onAnimationEndFunction() : null;
        object.element.classList.remove(`animate__animated`, animation);
    }
    // When the animation ends, we clean the classes and resolve the Promise
    object.element.addEventListener("animationend", handleAnimationEnd, { once: true });
};
export default $Animate;
