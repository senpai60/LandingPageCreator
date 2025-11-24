import { useDroppable } from "@dnd-kit/core";
import { useElementContext } from "../context/ElementCreateContext";

// List of elements that can accept children
const CONTAINER_TYPES = ["div", "section", "root"];

export default function ElementWrapper({ elementId }) {
  const { elements, selectedId, setSelectedId } = useElementContext();
  const element = elements[elementId];

  // Agar element delete ho gaya ho toh crash na ho
  if (!element) return null;

  // 1. Sirf containers ko Droppable banao
  const isContainer = CONTAINER_TYPES.includes(element.type);
  const { setNodeRef, isOver } = useDroppable({
    id: element.id,
    disabled: !isContainer, // Text/Image/Button ke andar drop nahi hoga
    data: { isContainer: true }, // Identifier
  });

  // 2. Styles Handling
  const isSelected = selectedId === element.id;
  const combinedStyles = {
    ...element.styles,
    // Visual feedback jab item iske upar drag ho raha ho
    outline: isSelected 
      ? "2px solid #2563eb" // Blue (Selected)
      : isOver && isContainer 
        ? "2px dashed #10b981" // Green (Hovering with item)
        : "none",
    cursor: "pointer",
    position: "relative", // Zaroori hai
    minHeight: element.children.length === 0 && isContainer ? "50px" : element.styles.minHeight, // Empty containers dikhne chahiye
  };

  // 3. Render Element
  const Tag = element.type === "root" ? "div" : element.type;

  return (
    <Tag
      ref={setNodeRef} // Important: Connect to dnd-kit
      id={element.id}
      style={combinedStyles}
      className={element.props?.className || ""}
      onClick={(e) => {
        e.stopPropagation(); // Parent select na ho
        setSelectedId(element.id);
      }}
      {...element.props}
    >
      {/* Content (Text only if not container/image) */}
      {element.type !== "img" && element.content}

      {/* Recursive Rendering of Children */}
      {element.children && element.children.map((childId) => (
        <ElementWrapper key={childId} elementId={childId} />
      ))}
    </Tag>
  );
}