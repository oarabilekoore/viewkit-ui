import { componentController } from "../dist/control";
interface tweenProperties {
    easing: string;
    target: object;
    duration: number;
}
export declare const $Tween: (object: componentController, tweenProperties: tweenProperties) => void;
export {};
