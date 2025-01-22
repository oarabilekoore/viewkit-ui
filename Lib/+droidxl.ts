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
    Animate: (type: AnimationTypes, callback?: Function, time?: number) => void;
    Batch: (properties: Record<string, any>) => void;
    ClearFocus: () => void;
    Focus: () => void;
    GetFocus: () => string;
    GetParent: () => UNIVERSAL_CONTROL_PROPERTIES[];
    GetPosition: (options: PositionOptions) => Position;
    GetVisibility: () => string;
    GetWidth: (unit?: Unit) => number;
    GetType: () => string;
    Gone: () => void;
    Hide: () => void;
    IsEnabled: () => boolean;
    IsVisible: () => boolean;
    IsOverlap: (control: UNIVERSAL_CONTROL_PROPERTIES[], depth: number) => boolean;
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
    GetParent(): UNIVERSAL_CONTROL_PROPERTIES[] {
        throw new Error("Method not implemented.");
    }
    GetPosition(options: PositionOptions): Position {
        throw new Error("Method not implemented.");
    }
    GetVisibility(): string {
        throw new Error("Method not implemented.");
    }
    GetWidth(unit?: Unit): number {
        throw new Error("Method not implemented.");
    }
    GetType(): string {
        throw new Error("Method not implemented.");
    }
    Gone(): void {
        throw new Error("Method not implemented.");
    }
    Hide(): void {
        throw new Error("Method not implemented.");
    }
    IsEnabled(): boolean {
        throw new Error("Method not implemented.");
    }
    IsVisible(): boolean {
        throw new Error("Method not implemented.");
    }
    IsOverlap(control: UNIVERSAL_CONTROL_PROPERTIES[], depth: number): boolean {
        throw new Error("Method not implemented.");
    }
    Show(): void {
        throw new Error("Method not implemented.");
    }
    SetDescription(description: string): void {
        throw new Error("Method not implemented.");
    }
    SetBackColor(color: string): void {
        throw new Error("Method not implemented.");
    }
    SetBackAlpha(alpha: number): void {
        throw new Error("Method not implemented.");
    }
    SetEnabled(enabled: boolean): void {
        throw new Error("Method not implemented.");
    }
    SetScale(x?: number, y?: number): void {
        throw new Error("Method not implemented.");
    }
    SetVisibility(visibility: VisibilityOptions): void {
        throw new Error("Method not implemented.");
    }
    SetSize(width: number, height?: number, unit?: Unit): void {
        throw new Error("Method not implemented.");
    }
    SetPadding(object: Position): void {
        throw new Error("Method not implemented.");
    }
    SetPosition(object: Position): void {
        throw new Error("Method not implemented.");
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
    | "column";

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

export class Layout extends UNIVERSAL_PROPERTIES {
    node: HTMLDivElement;
    constructor(type: LayoutTypes, options: LayoutOptions, parent?: Layout) {
        super();
        this.node = document.createElement("div");
        parent ? parent.AddChild(this.node) : null;
        this.node.className = `${type}-layout ${options.split(",").join(" ")}`;
    }
    AddChild(child: any) {
        this.node.appendChild(child.node);
    }
    RemoveChild(child: UNIVERSAL_CONTROL_PROPERTIES[]) {}
    HasChild(child: UNIVERSAL_CONTROL_PROPERTIES[]) {}
    DestroyChild(child: UNIVERSAL_CONTROL_PROPERTIES[]) {}
    SetElevation(elevation: number) {}
    SetGravity(gravity: Gravity) {}
    SetChildMargins(margins: Position) {}
    SetChildPadding(padding: Position) {}
    SetChildTextSize(size: number, unit?: Unit) {}
}

export function LayoutToPageBinder(control: Layout, type?: LayoutTypes, options?: LayoutOptions) {
    if (type && options) {
        return new Layout(type, options, control);
    }
    const base = document.getElementById("root");

    base?.appendChild(control.node);
    document.body.style.margin = "0";
    document.body.style.width = "100%";
    document.body.style.height = `${window.innerHeight}`;
}
