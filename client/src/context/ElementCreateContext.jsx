import { createContext, useContext, useState } from "react";

// 1. Create Context
const ElementCreateContext = createContext();

// 2. Provider Component
export const ElementProvider = ({ children }) => {
  const [elements, setElements] = useState([]);

  // ADD NEW ELEMENT
  const addElement = (newElement) => {
    setElements((prev) => [...prev, newElement]);
    
  };

  // UPDATE ELEMENT
  const updateElement = (id, updatedData) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updatedData } : el))
    );
  };

  // DELETE ELEMENT
  const deleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <ElementCreateContext.Provider
      value={{ elements, addElement, updateElement, deleteElement }}
    >
      {children}
    </ElementCreateContext.Provider>
  );
};

// 3. Custom Hook for easy usage
export const useElementContext = () => useContext(ElementCreateContext);
