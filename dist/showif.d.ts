import type { Component } from "./types";
/** * showIF method allows you to hide or show an element if the restingParameter is truthy */
declare const showIF: (restingParameter: boolean, onTruthyElement: Component, onFalseyElement: Component) => void;
export default showIF;
