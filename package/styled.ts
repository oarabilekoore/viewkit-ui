type CSSValue = string | number | CSSObject | CSSStyleDeclaration;
interface CSSObject {
    [property: string]: CSSValue;
}

export function css(css: Partial<CSSStyleDeclaration & CSSObject>, classname?: string): string {
    if (typeof css !== "object") {
        throw Error("The parameter passed into the $css function is not an object.");
    }

    let rulename = String(Date.now().toString(36).slice(-6));
    let cssstring = "";
    if (classname) rulename = classname;

    Object.entries(css).forEach(([key, value]) => {
        const stringified_key = String(key);
        if (stringified_key.startsWith("@")) {
            cssstring += `${key} { .${rulename} { ${mediaquery_parser(key, value)} } }\n`;
        } else if (key.includes("&")) {
            const selector = key.replace(/&/g, `.${rulename}`);
            cssstring += `${selector} { ${pseudoclass_parser(value)} }\n`;
        } else {
            cssstring += `.${rulename} { ${general_parser(key, value)} }\n`;
        }
    });

    // Append all at once using textContent, for perfomance over using insertRule
    const style = document.createElement("style");
    style.textContent = cssstring;
    document.head.appendChild(style);

    return rulename;
}

function camelcase_to_kebab_case(str: string) {
    const chars = [];
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char >= "A" && char <= "Z") {
            chars.push("-", char.toLowerCase());
        } else {
            chars.push(char);
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

function mediaquery_parser(key: string, value: any) {
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
