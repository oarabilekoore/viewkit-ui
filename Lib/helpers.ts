export const generateId = function (): string {
    return `rs-${Math.random().toString(36).substr(2, 9)}`;
};

export const generateClassName = function (): string {
    return `rs-${Math.random().toString(36).substr(2, 9)}`;
};
