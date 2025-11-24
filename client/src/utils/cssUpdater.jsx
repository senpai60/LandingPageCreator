export const cssCategories = [
  // ======================================================
  // 1. LAYOUT
  // ======================================================
  {
    title: "Layout",
    items: [
      { label: "Display", prop: "display", type: "select", options: ["block", "inline-block", "inline", "flex", "grid", "inline-flex", "inline-grid", "none"] },
      { label: "Position", prop: "position", type: "select", options: ["static", "relative", "absolute", "fixed", "sticky"] },
      { label: "Top", prop: "top", type: "text", placeholder: "e.g. 10px" },
      { label: "Right", prop: "right", type: "text", placeholder: "e.g. 10px" },
      { label: "Bottom", prop: "bottom", type: "text", placeholder: "e.g. 10px" },
      { label: "Left", prop: "left", type: "text", placeholder: "e.g. 10px" },
      { label: "Z-Index", prop: "zIndex", type: "text", placeholder: "1" },
      { label: "Overflow", prop: "overflow", type: "select", options: ["visible", "hidden", "scroll", "auto"] },
    ],
  },

  // ======================================================
  // 2. FLEX PROPERTIES
  // ======================================================
  {
    title: "Flex",
    items: [
      { label: "Direction", prop: "flexDirection", type: "select", options: ["row", "column", "row-reverse", "column-reverse"] },
      { label: "Wrap", prop: "flexWrap", type: "select", options: ["nowrap", "wrap", "wrap-reverse"] },
      { label: "Justify Content", prop: "justifyContent", type: "select", options: ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"] },
      { label: "Align Items", prop: "alignItems", type: "select", options: ["flex-start", "center", "flex-end", "stretch", "baseline"] },
      { label: "Align Content", prop: "alignContent", type: "select", options: ["flex-start", "center", "flex-end", "stretch", "space-between", "space-around"] },
      { label: "Gap", prop: "gap", type: "text", placeholder: "10px" },
    ],
  },

  // ======================================================
  // 3. GRID PROPERTIES
  // ======================================================
  {
    title: "Grid",
    items: [
      { label: "Columns", prop: "gridTemplateColumns", type: "text", placeholder: "repeat(3, 1fr)" },
      { label: "Rows", prop: "gridTemplateRows", type: "text", placeholder: "auto auto" },
      { label: "Column Gap", prop: "columnGap", type: "text", placeholder: "10px" },
      { label: "Row Gap", prop: "rowGap", type: "text", placeholder: "10px" },
      { label: "Justify Items", prop: "justifyItems", type: "select", options: ["start", "center", "end", "stretch"] },
      { label: "Align Items", prop: "alignItems", type: "select", options: ["start", "center", "end", "stretch"] },
    ],
  },

  // ======================================================
  // 4. DIMENSIONS & SPACING
  // ======================================================
  {
    title: "Dimensions & Spacing",
    items: [
      { label: "Width", prop: "width", type: "text", placeholder: "auto" },
      { label: "Height", prop: "height", type: "text", placeholder: "auto" },

      { label: "Min Width", prop: "minWidth", type: "text" },
      { label: "Max Width", prop: "maxWidth", type: "text" },
      { label: "Min Height", prop: "minHeight", type: "text" },
      { label: "Max Height", prop: "maxHeight", type: "text" },

      { label: "Padding", prop: "padding", type: "text" },
      { label: "Padding Top", prop: "paddingTop", type: "text" },
      { label: "Padding Right", prop: "paddingRight", type: "text" },
      { label: "Padding Bottom", prop: "paddingBottom", type: "text" },
      { label: "Padding Left", prop: "paddingLeft", type: "text" },

      { label: "Margin", prop: "margin", type: "text" },
      { label: "Margin Top", prop: "marginTop", type: "text" },
      { label: "Margin Right", prop: "marginRight", type: "text" },
      { label: "Margin Bottom", prop: "marginBottom", type: "text" },
      { label: "Margin Left", prop: "marginLeft", type: "text" },
    ],
  },

  // ======================================================
  // 5. TYPOGRAPHY
  // ======================================================
  {
    title: "Typography",
    items: [
      { label: "Font Size", prop: "fontSize", type: "text", placeholder: "16px" },
      { label: "Font Weight", prop: "fontWeight", type: "select", options: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] },
      { label: "Line Height", prop: "lineHeight", type: "text", placeholder: "1.5" },
      { label: "Letter Spacing", prop: "letterSpacing", type: "text", placeholder: "0px" },
      { label: "Text Align", prop: "textAlign", type: "select", options: ["left", "center", "right", "justify"] },
      { label: "Color", prop: "color", type: "color" },
      { label: "Font Style", prop: "fontStyle", type: "select", options: ["normal", "italic", "oblique"] },
      { label: "Text Transform", prop: "textTransform", type: "select", options: ["none", "uppercase", "lowercase", "capitalize"] },
      { label: "Text Decoration", prop: "textDecoration", type: "text", placeholder: "underline" },
    ],
  },

  // ======================================================
  // 6. APPEARANCE (BORDER, BG, SHADOW)
  // ======================================================
  {
    title: "Appearance",
    items: [
      { label: "Background Color", prop: "backgroundColor", type: "color" },
      { label: "Background Image", prop: "backgroundImage", type: "text", placeholder: "url(...)" },
      { label: "Background Size", prop: "backgroundSize", type: "text", placeholder: "cover / contain" },
      { label: "Background Repeat", prop: "backgroundRepeat", type: "select", options: ["no-repeat", "repeat", "repeat-x", "repeat-y"] },

      { label: "Border", prop: "border", type: "text", placeholder: "1px solid #000" },
      { label: "Border Radius", prop: "borderRadius", type: "text", placeholder: "8px" },
      { label: "Border Color", prop: "borderColor", type: "color" },
      { label: "Border Width", prop: "borderWidth", type: "text" },

      { label: "Box Shadow", prop: "boxShadow", type: "text", placeholder: "0 0 10px rgba(0,0,0,0.2)" },
      { label: "Opacity", prop: "opacity", type: "text", placeholder: "1" },
    ],
  },

  // ======================================================
  // 7. TRANSFORM
  // ======================================================
  {
    title: "Transform",
    items: [
      { label: "Scale", prop: "scale", type: "text", placeholder: "1" },
      { label: "Rotate", prop: "rotate", type: "text", placeholder: "45deg" },
      { label: "Translate X", prop: "translateX", type: "text", placeholder: "10px" },
      { label: "Translate Y", prop: "translateY", type: "text", placeholder: "10px" },
    ],
  },

  // ======================================================
  // 8. TRANSITION & ANIMATION
  // ======================================================
  {
    title: "Transition",
    items: [
      { label: "Transition", prop: "transition", type: "text", placeholder: "all 0.3s ease" },
      { label: "Cursor", prop: "cursor", type: "select", options: ["pointer", "default", "move", "text", "grab"] },
    ],
  },
];
