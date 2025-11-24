import { createContext, useContext, useState } from "react";

// 1. Create Context
const StyleContext = createContext();

// 2. Provider Component
export const StyleProvider = ({ children }) => {
  // Which block is selected on canvas
  const [selectedElementId, setSelectedElementId] = useState(null);

  // Styles store for all elements
  const [styles, setStyles] = useState({});

  /**
   *  SET CURRENTLY SELECTED ELEMENT
   *  Called when user clicks a block on canvas
   */
  const selectElement = (id) => {
    setSelectedElementId(id);
  };

  /**
   *  UPDATE STYLE OF A SPECIFIC ELEMENT
   *  This updates width, height, padding, color, etc.
   */
  const updateStyle = (id, newStyles) => {
    setStyles((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        ...newStyles,
      },
    }));
  };

  /**
   *  GET STYLE OF A SPECIFIC ELEMENT BY ID
   */
  const getStyle = (id) => {
    return styles[id] || {};
  };

  return (
    <StyleContext.Provider
      value={{
        selectedElementId,
        selectElement,
        updateStyle,
        getStyle,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

// 3. Custom Hook to use Context Easily
export const useStyleContext = () => useContext(StyleContext);
