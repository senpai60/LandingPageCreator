import { CirclePlus, Box, Type, Image as ImageIcon, LayoutTemplate, MousePointerClick, ChevronRight, ChevronDown } from 'lucide-react';
import { useElementContext } from "../context/ElementCreateContext";
import { useDraggable } from "@dnd-kit/core";
import { useState } from 'react';

// Draggable Item Component (Same as before)
const DraggableItem = ({ type, icon: Icon, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `sidebar-${type}`,
    data: { type },
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 999, opacity: 0.8 }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-lg cursor-grab hover:shadow-md hover:border-blue-400 transition-all active:cursor-grabbing">
      <Icon size={20} className="text-gray-600 mb-2" />
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </div>
  );
};

export default function Sidebar({ setShowCreateElementContext }) {
  // Ab 'selectedId' aur 'setSelectedId' bhi ElementContext se aayenge
  const { elements, selectedId, setSelectedId } = useElementContext(); 

  const tools = [
    { type: "div", label: "Container", icon: Box },
    { type: "section", label: "Section", icon: LayoutTemplate },
    { type: "h1", label: "Heading", icon: Type },
    { type: "p", label: "Text", icon: Type },
    { type: "button", label: "Button", icon: MousePointerClick },
    { type: "img", label: "Image", icon: ImageIcon },
  ];

  // --- RECURSIVE COMPONENT FOR LAYERS ---
  const LayerNode = ({ nodeId, depth = 0 }) => {
    const element = elements[nodeId];
    if (!element) return null;

    const hasChildren = element.children && element.children.length > 0;
    const isSelected = selectedId === nodeId;
    const [expanded, setExpanded] = useState(true);

    return (
      <div className="select-none">
        <div 
          onClick={() => setSelectedId(nodeId)}
          className={`
            flex items-center gap-2 p-2 rounded cursor-pointer text-xs mb-0.5
            ${isSelected ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'hover:bg-gray-100 border border-transparent'}
          `}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
           {/* Expand Toggle */}
           {hasChildren ? (
             <button onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} className="text-gray-500 hover:text-black">
                {expanded ? <ChevronDown size={12}/> : <ChevronRight size={12}/>}
             </button>
           ) : <span className="w-3"></span>}

           <span className="font-semibold opacity-70 uppercase text-[10px]">{element.type}</span>
           <span className="truncate text-gray-400">#{nodeId.slice(0, 4)}</span>
        </div>

        {/* Render Children */}
        {hasChildren && expanded && (
          <div>
            {element.children.map(childId => (
              <LayerNode key={childId} nodeId={childId} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="w-64 h-full bg-gray-50 border-r flex flex-col shadow-sm z-20">
      <div className="p-4 border-b bg-white">
        <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Components</h2>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3 overflow-y-auto max-h-[40%]">
        {tools.map((tool) => (
          <DraggableItem key={tool.type} type={tool.type} icon={tool.icon} label={tool.label} />
        ))}
      </div>

      <div className="mt-auto border-t bg-white p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase">Layers</h3>
        </div>
        
        {/* Start rendering from ROOT */}
        <div className="space-y-1">
            {elements["root"] ? (
                <LayerNode nodeId="root" />
            ) : (
                <p className="text-xs text-red-400">Root element missing!</p>
            )}
        </div>
      </div>
    </aside>
  );
}