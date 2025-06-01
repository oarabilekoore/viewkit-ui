export type Layout_Direction = "TOP_TO_BOTTOM" | "BOTTOM_TO_TOP" | "LEFT_TO_RIGHT" | "RIGHT_TO_LEFT";
export type Element_Alignment = "CENTER" | "LEFT" | "BOTTOM" | "RIGHT" | "VCENTER" | "HCENTER";
export type Scroll_Direction = "HORIZONTAL" | "VERTICAL" | "BOTH";
export type Parent_Fill = "FILLXY" | "FILLX" | "FILLY";
export interface Parent {
    children: HTMLElement[];
    removeChildren(): void;
    appendChild(child: HTMLElement): void;
    removeChild(child: HTMLElement): void;
    insertBefore(child: HTMLElement, before: HTMLElement): void;
}
export type MergedParentTypes = Parent | HTMLElement | HTMLDivElement;
export type SafeParent = MergedParentTypes | undefined;
