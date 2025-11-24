// Helper function to handle rendering based on Flat State
export const renderElement = (elementId, elementsMap, onSelect, selectedId) => {
  const element = elementsMap[elementId];
  if (!element) return null;

  const Tag = element.type; // Note: 'elementType' changed to 'type' in your new context
  
  // Styles handle karna
  const isSelected = elementId === selectedId;
  const finalStyles = {
    ...element.styles,
    outline: isSelected ? "2px solid #2563eb" : "none", // Blue border if selected
    cursor: "pointer",
  };

  return (
    <Tag
      key={element.id}
      id={element.id}
      style={finalStyles}
      className={element.props?.className || ""} // Handle className if present
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element.id); // Select this element
      }}
      {...element.props}
    >
      {/* Agar Image hai toh content mat dikhao, nahi toh text content */}
      {element.type !== 'img' && element.content}

      {/* Render children by mapping over IDs and looking them up recursively */}
      {element.children && element.children.map((childId) => 
        renderElement(childId, elementsMap, onSelect, selectedId)
      )}
    </Tag>
  );
};