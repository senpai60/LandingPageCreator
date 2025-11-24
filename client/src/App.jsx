import { ElementProvider, useElementContext } from "./context/ElementCreateContext.jsx";
import { DndContext, pointerWithin } from "@dnd-kit/core"; // 'pointerWithin' import karo
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import SettingsPanel from "./components/SettingsPanel";
import CodePanel from "./components/CodePanel";
import { useState } from "react";

function EditorLayout() {
  const [showCodePanel, setShowCodePanel] = useState(false);
  const { addElement, elements } = useElementContext(); // elements bhi chahiye check karne ke liye

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    // Agar kahin drop nahi kiya
    if (!over) return;

    // Sidebar se jo item drag kiya uska type
    const type = active.data.current?.type;
    if (!type) return;

    let parentId = "root"; // Default parent

    // LOGIC: Check karo drop kahan hua
    if (over.id === "canvas-drop-zone") {
      parentId = "root";
    } else if (elements[over.id]) {
      // Agar kisi existing element pe drop kiya
      const targetElement = elements[over.id];
      
      // Check: Kya ye element bacchon ko accept karta hai?
      if (["div", "section", "root"].includes(targetElement.type)) {
        parentId = over.id;
      } else {
        // Agar button/text/img pe drop kiya, toh hum uske parent mein daal sakte hain
        // ya filhal ignore kar sakte hain. Let's fallback to root/ignore for safety.
        // Better UX: Find parent of hover target (Future implementation)
        return; 
      }
    }

    // Finally add element
    addElement(parentId, type);
  };

  return (
    // 'collisionDetection={pointerWithin}' Nested elements ke liye bohot zaroori hai
    <DndContext onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
      <div className="flex flex-col h-screen overflow-hidden">
        <Navbar showCodePanel={showCodePanel} setShowCodePanel={setShowCodePanel} />
        
        <div className="flex flex-1 overflow-hidden relative">
          <Sidebar setShowCreateElementContext={() => {}} />
          <Canvas />
          <SettingsPanel />
        </div>

        {showCodePanel && (
           <div className="border-t border-gray-700">
             <CodePanel />
           </div>
        )}
      </div>
    </DndContext>
  );
}

export default function App() {
  return (
    <ElementProvider>
       <EditorLayout />
    </ElementProvider>
  );
}