import { createContext, useContext, useState } from "react";
import { defaultStyle } from "../utils/generateDefaultStyle";

const ElementContext = createContext();

// Initial Root Element (The main canvas container)
const initialElements = {
  "root": {
    id: "root",
    type: "div",
    children: [],
    content: "",
    styles: {
      minHeight: "600px",
      padding: "20px",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    },
    props: {}
  }
};

export const ElementProvider = ({ children }) => {
  // FLAT STATE STRUCTURE (Database Style)
  const [elements, setElements] = useState(initialElements);
  const [selectedId, setSelectedId] = useState(null);

  // --- ACTIONS ---

  // 1. ADD ELEMENT (O(1) Operation)
  const addElement = (parentId, type) => {
    const newId = crypto.randomUUID();
    const newStyle = defaultStyle(type);

    const newElement = {
      id: newId,
      type: type,
      children: [],
      content: type === "img" ? "" : `New ${type}`,
      styles: newStyle,
      props: type === "img" ? { src: "https://via.placeholder.com/150" } : {}
    };

    setElements((prev) => {
      // Parent validation
      const parent = prev[parentId];
      if (!parent) return prev;

      return {
        ...prev,
        [newId]: newElement, // Add new item to dictionary
        [parentId]: {
          ...parent,
          children: [...parent.children, newId] // Add ID to parent's children array
        }
      };
    });
    
    // Auto-select the new element
    setSelectedId(newId);
  };

  // 2. UPDATE ELEMENT (Content, Styles, Props)
  const updateElement = (id, updates) => {
    setElements((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  };

  // 3. DELETE ELEMENT
  // Note: For a robust app, we should also delete all children recursively to prevent memory leaks (orphaned items).
  const deleteElement = (id) => {
    if (id === "root") return; // Cannot delete root

    setElements((prev) => {
      const elementToDelete = prev[id];
      // Find parent to remove the ID from its children list
      // Since we don't store parentId explicitly to save space, we search for it.
      // In a production app, storing parentId in the object is better for performance.
      const parentEntry = Object.entries(prev).find(([_, el]) => el.children.includes(id));
      
      if (!parentEntry) return prev;
      
      const [parentId, parent] = parentEntry;

      const newElements = { ...prev };
      delete newElements[id]; // Remove the item

      // Remove from parent's children
      newElements[parentId] = {
        ...parent,
        children: parent.children.filter((childId) => childId !== id)
      };

      return newElements;
    });

    if (selectedId === id) setSelectedId(null);
  };

  // 4. MOVE ELEMENT (Drag and Drop Logic)
  const moveElement = (dragId, hoverId) => {
    // Basic implementation: Move dragId to become a child of hoverId
    // Or reorder if they are siblings (Advanced logic needed for reordering)
    // For now, we will handle "Add to Container" logic via Drop.
  };

  return (
    <ElementContext.Provider
      value={{
        elements,
        selectedId,
        setSelectedId,
        addElement,
        updateElement,
        deleteElement
      }}
    >
      {children}
    </ElementContext.Provider>
  );
};

export const useElementContext = () => useContext(ElementContext);