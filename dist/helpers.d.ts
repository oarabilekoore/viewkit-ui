export declare const generateClassName: Function;
/**
 * Allows me to provide better debug info on errors and stop function execution
 */
export declare const debugInfo: (title: string, source: string, debugObject: object) => never;
export declare class Ratio {
    consequent: number;
    antecedent: number;
    constructor(antecedent: number, consequent: number);
    getFirstToSecond(antecedentReliantValue: number): number;
    getSecondToFirst(consequentReliantValue: number): number;
}
export declare function dimensioningWidthFn(value: number): number;
export declare function dimensioningHeightFn(value: number): number;
