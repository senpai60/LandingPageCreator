import { useElementContext } from "../context/ElementCreateContext";
import { useDroppable } from "@dnd-kit/core";
import ElementWrapper from "./ElementWrapper"; // Import the new component

export default function Canvas() {
  const { elements, setSelectedId } = useElementContext();

  // Root canvas droppable zone (fallback)
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone",
  });

  return (
    <main 
      className="flex-1 bg-[#e5e7eb] p-8 overflow-y-auto flex justify-center"
      onClick={() => setSelectedId(null)} // Click outside to deselect
    >
      <div
        ref={setNodeRef}
        className={`
            w-full max-w-[1200px] min-h-[800px] transition-all duration-200 ease-in-out
            ${isOver ? 'bg-blue-50' : ''}
        `}
      >
        {/* Start rendering from Root ID */}
        {elements["root"] ? (
           <ElementWrapper elementId="root" />
        ) : (
           <div className="p-10 text-center text-red-500 bg-white rounded">
             Error: Root element missing.
           </div>
        )}
      </div>
    </main>
  );
}