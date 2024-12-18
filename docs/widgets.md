# Widgets Documented

<div align="center"><img src="../rosana.png" width="100" /></div>

<div align="center">
    <img alt="MIT Licensed" src="https://img.shields.io/badge/license-MIT-blue.svg">
    <img alt="Version Badge" src="https://img.shields.io/badge/version-1.2.0-brightgreen.svg">
</div>

<br>


This document describes the available widgets in the framework.

The `WidgetOptions` is a parameter in every widget except the `Link` widget which has its own definitions.

`WidgetOptions` type is defined as :

```typescript
export type WidgetOptions = Partial<{
    style: string;
}> & {
    parent: ContainerWidget;
};
```

- **style** It is optional, expects a string (a classname)
- **parent** It is a reference to the container that element should be a part of


## Button

Creates an HTML button element with optional text content and properties.

```javascript
Button(text: string, properties: WidgetOptions): HTMLButtonElement
```

- **text**: The text content of the button (default: "").

## Image

Creates an HTML img element with a specified source and properties.

```javascript
Image(src: string, properties: WidgetOptions): HTMLImageElement
```
- **src** source URL of the image

## Anchor

Creates an HTML a (anchor) element with a specified href, text, and properties.

```javascript
Anchor(text: string, properties: AnchorOptions): HTMLAnchorElement
```

## Heading

Creates an HTML h1-h6 heading element with a specified level, text, and properties.

```typescript
Heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6, properties: WidgetOptions): HTMLHeadingElement
```

## Input

Creates an HTML input element with a specified type and properties.

```typescript
Input(type: string, properties: WidgetOptions): HTMLInputElement
```

## TextArea

Creates an HTML textarea element with a specified placeholder and properties.

```typescript
TextArea(placeholder: string, properties: WidgetOptions): HTMLTextAreaElement
```

## Video

Creates an HTML video element with a specified source and properties.

```typescript
Video(src: string, properties: WidgetOptions): HTMLVideoElement
```

## Audio

Creates an HTML audio element with a specified source and properties.

```typescript
Audio(src: string, properties: WidgetOptions): HTMLAudioElement
```

## IFrame

Creates an HTML iframe element with a specified source and properties.

```typescript
IFrame(src: string, properties: WidgetOptions): HTMLIFrameElement
```

## Canvas

Creates an HTML canvas element with specified properties.

```typescript
Canvas(properties: WidgetOptions): HTMLCanvasElement
```

## Hr

Creates an HTML hr (horizontal rule) element with specified properties.

```typescript
Hr(properties: WidgetOptions): HTMLHRElement
```

## Br

Creates an HTML br (line break) element with specified properties.

```typescript
Br(properties: WidgetOptions): HTMLBRElement
```

## Link

Creates an HTML a (anchor) element with specified text, options, and routing behavior.

```typescript
Link(text: string, properties: LinkOptions): HTMLAnchorElement
```

- **text** The text content of the link (default: "").
- **properties**: Options for the widget (to, style, query, parent, etc.).

In the LinkOptions properties

- **to** The route
- **style** The CSS Style
- **query** Query parameter in object form
- **behaveLikeLink** Whether the href should be set or not.