export type Unit = "px" | "dp" | "sp" | "in" | "mm" | "pt";
export type VisibilityOptions = "show" | "hide" | "gone";
export type PositionOptions = "screen" | Unit;
export type Position = { left: number; top: number; width: number; height: number } & Partial<{
    unit: Unit;
}>;

export type TweenOptions = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    scaleWidth?: number;
    scaleHeight?: number;
    rotation?: number;
};

export type TweeningTypes =
    | "linear"
    | "easeInSine"
    | "easeOutSine"
    | "easeInOutSine"
    | "easeInQuad"
    | "easeOutQuad"
    | "easeInOutQuad"
    | "easeInCubic"
    | "easeOutCubic"
    | "easeInOutCubic"
    | "easeInQuart"
    | "easeOutQuart"
    | "easeInOutQuart"
    | "easeInQuint"
    | "easeOutQuint"
    | "easeInOutQuint"
    | "easeInExpo"
    | "easeOutExpo"
    | "easeInOutExpo"
    | "easeInCirc"
    | "easeOutCirc"
    | "easeInOutCirc"
    | "easeInBack"
    | "easeOutBack"
    | "easeInOutBack"
    | "easeInElastic"
    | "easeOutElastic"
    | "easeInOutElastic"
    | "easeInBounce"
    | "easeOutBounce"
    | "easeInOutBounce";

export type AnimationTypes =
    | "newspaper"
    | "jelly"
    | "flash"
    | "rubberband"
    | "fall"
    | "fallrotate"
    | "zoomin"
    | "zoomout"
    | "zoominenter"
    | "zoomoutexit"
    | "slidefromleft"
    | "slidefromright"
    | "slidefrombottom"
    | "slidefromtop"
    | "slidetoleft"
    | "slidetoright"
    | "slidetobottom"
    | "slidetotop";

export type UNIVERSAL_CONTROL_PROPERTIES = {
    node: HTMLElement;
    Animate: (type: AnimationTypes, callback?: Function, time?: number) => void;
    Batch: (properties: Record<string, any>) => void;
    ClearFocus: () => void;
    Focus: () => void;
    GetFocus: () => string;
    GetPosition: (options: PositionOptions) => Position;
    GetType: () => string;
    Hide: () => void;
    IsEnabled: () => boolean;
    IsVisible: () => boolean;
    Show: () => void;
    SetDescription: (description: string) => void;
    SetBackColor: (color: string) => void;
    SetBackAlpha: (alpha: number) => void;
    SetEnabled: (enabled: boolean) => void;
    SetScale: (x?: number, y?: number) => void;
    SetVisibility: (visibility: VisibilityOptions) => void;
    SetSize: (width: number, height?: number, unit?: Unit) => void;
    SetPadding: (object: Position) => void;
    SetPosition: (object: Position) => void;
    Resize: () => void;
    Tween: (
        target: TweenOptions,
        type: TweeningTypes,
        duration?: number,
        repeat?: boolean,
        yoyo?: boolean,
        callback?: Function,
    ) => void;
};

export class UNIVERSAL_PROPERTIES implements UNIVERSAL_CONTROL_PROPERTIES {
    node!: HTMLElement;
    Animate(type: AnimationTypes, callback?: Function, time?: number): void {
        throw new Error("Method not implemented.");
    }
    Batch(properties: Record<string, any>): void {
        throw new Error("Method not implemented.");
    }
    ClearFocus(): void {
        throw new Error("Method not implemented.");
    }
    Focus(): void {
        throw new Error("Method not implemented.");
    }
    GetFocus(): string {
        throw new Error("Method not implemented.");
    }
    GetPosition(options: PositionOptions): Position {
        throw new Error("Method not implemented.");
    }

    GetType(): string {
        throw new Error("Method not implemented.");
    }
    Hide(): void {
        this.node.style.display = "none";
    }
    IsEnabled(): boolean {
        return this.node.style.pointerEvents === "auto";
    }
    IsVisible(): boolean {
        return this.node.style.display === "block";
    }
    Show(): void {
        this.node.style.display = "block";
    }
    SetDescription(description: string): void {
        this.node.ariaLabel = description;
    }
    SetBackColor(color: string): void {
        this.node.style.backgroundColor = color;
    }
    SetBackAlpha(alpha: number): void {
        this.node.style.opacity = `${alpha}`;
    }
    SetEnabled(enabled: boolean): void {
        this.node.style.pointerEvents = enabled ? "auto" : "none";
    }
    SetScale(x?: number, y?: number): void {
        throw new Error("Method not implemented.");
    }
    SetVisibility(visibility: VisibilityOptions): void {
        this.node.style.visibility = visibility;
    }
    SetSize(width: number, height?: number, unit?: Unit): void {
        this.node.style.width = `${width}${unit}`;
        this.node.style.height = `${height}${unit}`;
    }
    SetPadding(object: Position): void {
        this.node.style.padding = `${object.left}${object.unit}
        ${object.top}${object.unit} 
        ${object.width}${object.unit} 
        ${object.height}${object.unit}`;
    }
    SetPosition(positon: Position): void {
        this.node.style.position = `${positon.left}${positon.unit}
        ${positon.top}${positon.unit} 
        ${positon.width}${positon.unit}
        ${positon.height}${positon.unit}`;
    }
    SetMargins(margins: Position): void {
        this.node.style.margin = `${margins.left}${margins.unit}
        ${margins.top}${margins.unit} 
        ${margins.width}${margins.unit}
        ${margins.height}${margins.unit}`;
    }
    Resize(): void {
        throw new Error("Method not implemented.");
    }
    Tween(
        target: TweenOptions,
        type: TweeningTypes,
        duration?: number,
        repeat?: boolean,
        yoyo?: boolean,
        callback?: Function,
    ): void {
        throw new Error("Method not implemented.");
    }
}

export type LayoutTypes =
    | "linear"
    | "relative"
    | "absolute"
    | "frame"
    | "scroll"
    | "grid"
    | "table"
    | "flow"
    | "card"
    | "flex";

export type LayoutOptions =
    | "fillxy"
    | "h/vcenter"
    | "touchthrough"
    | "scrollx"
    | "scrolly"
    | "noscrollbars"
    | "center"
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "wrap"
    | "nowrap"
    | "reverse"
    | "row"
    | "column"
    | "row-reverse"
    | "column"
    | (string & {});

export type Gravity =
    | "center"
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "vcenter"
    | "hcenter"
    | "fillx"
    | "filly"
    | "fillxy";

export class DXLLayout extends UNIVERSAL_PROPERTIES {
    node: HTMLDivElement;
    constructor(type: LayoutTypes, options: LayoutOptions | LayoutOptions[]) {
        super();
        this.node = document.createElement("div");

        const optionsClass = Array.isArray(options)
            ? options.join(" ") // Join multiple options with spaces
            : options; // Use the single option as is

        this.node.className = `${type}-layout ${optionsClass}`;
    }
    BindToPage() {
        const base = document.getElementById("root");

        base?.appendChild(this.node);
        document.body.style.margin = "0";
        document.body.style.width = "100%";
        document.body.style.height = `${window.innerHeight}`;
    }
    AddChild(child: UNIVERSAL_CONTROL_PROPERTIES) {
        this.node.appendChild(child.node);
    }
    RemoveChild(child: UNIVERSAL_CONTROL_PROPERTIES) {
        this.node.removeChild(child.node);
    }
    HasChild(child: UNIVERSAL_CONTROL_PROPERTIES[]) {
        return this.node.contains(child[0].node);
    }
    SetElevation(elevation: number) {
        this.node.style.zIndex = `${elevation}`;
    }
    SetGravity(gravity: Gravity) {}
    SetChildMargins(margins: Position) {}
    SetChildPadding(padding: Position) {}
    SetChildTextSize(size: number, unit?: Unit) {}
}

export function Layout(type: LayoutTypes, options: LayoutOptions) {
    return new DXLLayout(type, options);
}
