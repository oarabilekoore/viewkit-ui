import { Parent } from "./types";
import "./baseline.css";
export declare function genericElement(tag: string): (...args: (string | Parent)[]) => HTMLElement;
export declare function createElement(data: {
    tag: string;
    text?: string;
}, parent: Parent | HTMLElement | HTMLDivElement): HTMLElement;
export declare function showIF(element: HTMLElement, condition: boolean): void;
