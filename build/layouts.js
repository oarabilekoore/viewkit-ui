export class LayoutConstructor {
    root;
    layout;
    children;
    style;
    constructor(parent, type, classes) {
        this.layout = document.createElement("div");
        this.style = this.layout.style;
        this.root = this.layout;
        this.children = [];
        this.layout.classList.add(`${type}-layout`, "show");
        //Check if the parent is an ordinary html-element
        //If not we append the child on the root value.
        //That means the parent is a layout.
        if (parent instanceof HTMLElement) {
            parent.appendChild(this.layout);
        }
        else {
            document.body.style.margin = "0";
            parent.root.appendChild(this.layout);
        }
        //Do a test if classes are provided, this is great
        //For creating other layout types.
        if (classes) {
            for (let i = 0; i < classes.length; i++) {
                this.layout.classList.add(classes[i]);
            }
        }
    }
    appendChild(child) {
        this.layout.appendChild(child);
        this.children.push(child);
    }
    removeChildren() {
        this.layout.innerHTML = "";
        this.children = [];
    }
    removeChild(child) {
        this.layout.removeChild(child);
        this.children = this.children.filter((c) => c !== child);
    }
    insertBefore(child, before) {
        this.layout.insertBefore(child, before);
    }
    set LayoutDirection(direction) {
        switch (direction) {
            case "TOP_TO_BOTTOM":
                this.layout.classList.add("top_to_bottom");
                break;
            case "BOTTOM_TO_TOP":
                this.layout.classList.add("bottom_to_top");
                break;
            case "LEFT_TO_RIGHT":
                this.layout.classList.add("left_to_right");
                break;
            default:
                this.layout.classList.add("RIGHT_TO_LEFT");
        }
    }
    set ElementAlignment(alignment) {
        this.layout.classList.add(alignment.toLowerCase());
    }
    set ParentFill(fill) {
        this.layout.classList.add(fill.toLowerCase());
    }
    set ScrollDirection(scrollDirection) {
        if (scrollDirection === "HORIZONTAL") {
            this.layout.classList.add("scrollx");
        }
        else if (scrollDirection === "VERTICAL") {
            this.layout.classList.add("scrolly");
        }
        else {
            this.layout.classList.add("scrollxy");
        }
    }
    set ScrollBarVisibility(visibility) {
        if (visibility === "SHOWN") {
            this.layout.classList.remove("noscrollbar");
        }
        else {
            this.layout.classList.add("noscrollbar");
        }
    }
}
