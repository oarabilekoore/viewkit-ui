var idCount = 0, classnameCount = 0;
/**
 * generate a unique id.
 * @returns HTMLELementId
 */
export const generateId = function () {
    return `rosana-id-${idCount++}`;
};
/**
 * generate a unique classname
 * @returns HTMLElementClassName
 */
export const generateClassName = function () {
    return `rosana-class-${classnameCount++}`;
};
