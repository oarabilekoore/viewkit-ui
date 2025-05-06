export declare type Layout_Direction = "TOP_TO_BOTTOM" | "BOTTOM_TO_TOP" | "LEFT_TO_RIGHT" | "RIGHT_TO_LEFT";
export declare type Element_Alignment = "CENTER" | "LEFT" | "BOTTOM" | "RIGHT" | "VCENTER" | "HCENTER";
export declare type Scroll_Direction = "HORIZONTAL" | "VERTICAL" | "BOTH";
export declare type Parent_Fill = "FILLXY" | "FILLX" | "FILLY";
export interface Parent {
    root: HTMLElement | HTMLDivElement;
    children: HTMLElement[];
    removeChildren(): void;
    appendChild(child: HTMLElement): void;
    removeChild(child: HTMLElement): void;
    insertBefore(child: HTMLElement, before: HTMLElement): void;
}
export declare type MergedParentTypes = Parent | HTMLElement | HTMLDivElement;
export declare type SafeParent = MergedParentTypes | undefined;
