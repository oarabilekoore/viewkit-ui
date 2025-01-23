export function generateClassName(): string {
    return `${Math.random().toString(36).substring(2, 15)} ${Math.random().toString(36).substring(2, 15)}`;
}

export function Log(msg: TemplateStringsArray) {
    console.log(msg);
}
