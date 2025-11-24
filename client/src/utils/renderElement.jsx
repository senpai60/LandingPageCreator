// Update arguments to accept globalStyles
export const renderElement = (element, globalStyles = {}, onSelect, selectedId) => {
  const Tag = element.elementType;

  // 1. Get overrides from context, or default to empty object
  const overrides = globalStyles[element.id] || {};

  // 2. Merge base styles with overrides
  const combinedStyles = { ...element.styles, ...overrides };

  // 3. Handle selection highlighting (from previous step)
  const isSelected = element.id === selectedId;
  if (isSelected) {
    combinedStyles.outline = "2px solid #2563eb"; // Add blue border when selected
    combinedStyles.cursor = "default";
  } else {
    combinedStyles.cursor = "pointer";
  }

  return (
    <Tag
      key={element.id}
      id={element.id}
      className={element.classList.join(" ")}
      style={combinedStyles} // <--- Use the merged styles here
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect(element.id);
      }}
      {...element.props}
    >
      {element.content}

      {/* 4. Recursively pass globalStyles down to children */}
      {element.children.map((child) => 
        renderElement(child, globalStyles, onSelect, selectedId)
      )}
    </Tag>
  );
};