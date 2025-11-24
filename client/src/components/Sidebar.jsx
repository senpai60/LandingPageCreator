import { useState } from "react";
import { DiamondPlus, ChevronRight, ChevronDown, Box } from 'lucide-react';
import { useElementContext } from "../context/ElementCreateContext";
import { useStyleContext } from "../context/StyleContext";

export default function Sidebar({ setShowCreateElementContext }) {
  const { elements, setTargetParentId } = useElementContext();
  const { selectElement, selectedElementId } = useStyleContext();

  const items2 = ["Text Block", "Image", "Button", "Card"];

  // Helper to handle adding a new ROOT element
  const handleAddRoot = () => {
    setTargetParentId(null);
    setShowCreateElementContext(true);
  };

  // Helper to handle adding a CHILD element
  const handleAddChild = (e, parentId) => {
    e.stopPropagation(); // Prevent selecting the row when clicking the button
    setTargetParentId(parentId);
    setShowCreateElementContext(true);
  };

  // RECURSIVE COMPONENT to render tree nodes
  const TreeNode = ({ element, depth = 0 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const hasChildren = element.children && element.children.length > 0;
    const isSelected = selectedElementId === element.id;

    return (
      <li className="select-none">
        <div 
          onClick={() => selectElement(element.id)}
          className={`
            flex items-center justify-between p-2 rounded cursor-pointer text-sm mb-1
            ${isSelected ? 'bg-blue-50 border-blue-200 border' : 'hover:bg-gray-100 border border-transparent'}
          `}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {/* Toggle Expand/Collapse */}
            {hasChildren ? (
               <button 
                 onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                 className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
               >
                 {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
               </button>
            ) : (
               <span className="w-3" /> // Spacer
            )}
            
            {/* Icon & Name */}
            <Box size={14} className="text-blue-500 shrink-0" />
            <span className="truncate">
              {element.id.slice(0, 8)} <span className="text-gray-400 text-xs">({element.elementType})</span>
            </span>
          </div>

          {/* Add Child Button */}
          <button 
            onClick={(e) => handleAddChild(e, element.id)} 
            className="text-gray-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors"
            title="Add Child Element"
          >
            <DiamondPlus size={14}/>
          </button>
        </div>

        {/* Render Children Recursively */}
        {hasChildren && isExpanded && (
          <ul className="border-l border-gray-200 ml-4">
            {element.children.map((child) => (
              <TreeNode key={child.id} element={child} depth={depth + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className="w-64 h-full border-r bg-gray-50 flex flex-col">
      {/* SECTION 1: COMPONENT TREE */}
      <div className="p-4 border-b flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-700">Layers</h2>
          <span className="text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded">{elements.length}</span>
        </div>
        
        <button
          onClick={handleAddRoot}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm text-sm font-medium mb-4 flex items-center justify-center gap-2 transition-colors"
        >
          <DiamondPlus size={16} /> New Layer
        </button>

        {elements.length === 0 ? (
          <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
            <p className="text-xs text-gray-400">No layers yet.</p>
            <p className="text-xs text-gray-400">Click button above.</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {elements.map((elem) => (
              <TreeNode key={elem.id} element={elem} />
            ))}
          </ul>
        )}
      </div>

      {/* SECTION 2: QUICK ADD */}
      <div className="p-4 bg-white h-1/3 border-t overflow-y-auto">
        <h2 className="font-bold text-gray-700 mb-3">Quick Add</h2>
        <div className="grid grid-cols-2 gap-2">
          {items2.map((item) => (
            <button
              key={item}
              className="p-2 text-xs bg-gray-50 border rounded hover:border-blue-400 hover:bg-blue-50 text-gray-600 transition-all text-left"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}