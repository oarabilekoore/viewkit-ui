type CSSValue = string | number | CSSObject | CSSStyleDeclaration;
interface CSSObject {
    [property: string | number]: CSSValue;
}

const style = document.head.appendChild(document.createElement("style"));
const sheet = style.sheet;

// We use a hashing algorithim; djb2 to generate classnames, because
// crypto.randomUUID is not as OP as i thought. -> The styles keep
// changing on every refresh.

function generateclassname(object: any): string {
    const stringifiedobject = JSON.stringify(object);
    const str = stringifiedobject;
    let hash = 5381;

    // The hash seed of djb2 starts at 5381, 33 is a magic number, we
    // power it using charCodeAt beacuse it gives the UTF-16 code for
    // a character, the loop turns str into a 32-bit number
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }

    // Added gg as starter in our classname cause good game lol, i
    // learnt alot, i even decided to document ts.
    // hah >>> 0 forces the 32 bit number into an unsinged 32 bit
    // number, plus toString(36), converts the number into a
    // base 32 string.
    return "gg" + (hash >>> 0).toString(36).slice(-6);
}

export function css(css: Partial<CSSValue & CSSObject>, classname?: string) {
    if (!css && typeof css !== "object" && Array.isArray(css)) {
        throw Error("The parameter passed into the $css function is not an object or is null.");
    }

    let rulename = classname ?? generateclassname(css);
    let cssRules = "";

    for (const [key, value] of Object.entries(css)) {
        if (key.startsWith("@")) {
            if (typeof value !== "object" || value == null) continue;
            const mediaRule = `@media ${key.slice(1)} { .${rulename} { ${mediaquery_parser(value)} } }`;
            cssRules += mediaRule + "\n";
            console.log(`Media query Insert: `, mediaRule);
        } else if (key.startsWith("&")) {
            if (typeof value !== "object" || value == null) continue;
            const selector = key.replace("&", "");
            const pseudoRule = `.${rulename}${selector} { ${pseudoclass_parser(value)} }`;
            cssRules += pseudoRule + "\n";
            console.log(`PseudoClass Insert: `, pseudoRule);
        } else {
            const normalRule = `.${rulename} { ${general_parser(key, value)} }`;
            cssRules += normalRule + "\n";
            console.log("inserting: ", normalRule);
        }
    }

    style.textContent += cssRules;
    return rulename;
}

function camelcase_to_kebab_case(str: string) {
    const chars = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char) {
            if (char >= "A" && char <= "Z") {
                chars.push("-", char.toLowerCase());
            } else {
                chars.push(char);
            }
        }
    }
    return chars.join("");
}

function general_parser(key: string, value: any) {
    if (key.startsWith("--")) {
        return `${key}: ${value};`;
    }
    const valStr = String(value).trim();
    const [val, important] = valStr.split(" !important");
    return `${camelcase_to_kebab_case(key)}: ${val}${important !== undefined ? " !important" : ""};`;
}

function mediaquery_parser(value: any) {
    let rule = "";
    for (const prop in value) {
        rule += `${general_parser(prop, value[prop])} `;
    }
    return rule.trim();
}

function pseudoclass_parser(value: any) {
    let rule = "";
    for (const k in value) {
        rule += `${general_parser(k, value[k])} `;
    }
    return rule.trim();
}
