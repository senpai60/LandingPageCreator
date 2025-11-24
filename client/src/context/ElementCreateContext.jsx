import { createContext, useContext, useState } from "react";

// 1. Create Context
const ElementCreateContext = createContext();

// 2. Provider Component
export const ElementProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  
  // --- MISSING STATE FIXED HERE ---
  const [targetParentId, setTargetParentId] = useState(null);

  // ADD NEW ELEMENT (Fixed to handle nesting)
  const addElement = (newElement, parentId = null) => {
    if (!parentId) {
      // Add to root
      setElements((prev) => [...prev, newElement]);
    } else {
      // Add as child to specific parent (Recursive updater)
      const addZoRecursive = (list) => {
        return list.map((el) => {
          if (el.id === parentId) {
            return { ...el, children: [...(el.children || []), newElement] };
          }
          if (el.children && el.children.length > 0) {
            return { ...el, children: addZoRecursive(el.children) };
          }
          return el;
        });
      };
      
      setElements((prev) => addZoRecursive(prev));
    }
  };

  // UPDATE ELEMENT (Recursive)
  const updateElement = (id, updatedData) => {
    const updateRecursive = (list) => {
        return list.map((el) => {
            if (el.id === id) {
                return { ...el, ...updatedData };
            }
            if (el.children && el.children.length > 0) {
                return { ...el, children: updateRecursive(el.children) };
            }
            return el;
        });
    };
    setElements((prev) => updateRecursive(prev));
  };

  // DELETE ELEMENT (Recursive)
  const deleteElement = (id) => {
     const deleteRecursive = (list) => {
        return list
            .filter((el) => el.id !== id)
            .map((el) => {
                if (el.children && el.children.length > 0) {
                    return { ...el, children: deleteRecursive(el.children) };
                }
                return el;
            });
     };
     setElements((prev) => deleteRecursive(prev));
  };

  return (
    <ElementCreateContext.Provider
      value={{ 
        elements, 
        addElement, 
        updateElement, 
        deleteElement,
        // --- EXPOSE THESE NEW VALUES ---
        targetParentId, 
        setTargetParentId 
      }}
    >
      {children}
    </ElementCreateContext.Provider>
  );
};

// 3. Custom Hook for easy usage
export const useElementContext = () => useContext(ElementCreateContext);