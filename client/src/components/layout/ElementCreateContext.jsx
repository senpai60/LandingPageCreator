import React, { useState, useEffect } from "react";
import { useElementContext } from "../../context/ElementCreateContext"; 
import { defaultStyle } from "../../utils/generateDefaultStyle";

export default function ElementCreateContext({ setShowCreateElementContext }) {
  // Now extracting targetParentId
  const { addElement, targetParentId } = useElementContext(); 

  const [elementType, setElementType] = useState("div");
  const [elementId, setElementId] = useState("");
  const [classes, setClasses] = useState("");
  const [content, setContent] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  // HANDLE CREATE ELEMENT
  const handleCreate = () => {
    const genStyles = defaultStyle(elementType)
    
    const newElement = {
      id: elementId || crypto.randomUUID(),
      styles: genStyles,
      elementType,
      classList: classes.trim() ? classes.split(" ") : [],
      content: content,
      props: {
        src: imgSrc,
      },
      children: [],
    };

    // Pass the targetParentId to the addElement function
    addElement(newElement, targetParentId); 

    setShowCreateElementContext(false); 
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white shadow-2xl rounded-xl w-[420px] p-6 border animate-in fade-in zoom-in duration-200">
        {/* Title */}
        <div className="mb-6 border-b pb-2">
          <h2 className="text-xl font-semibold text-gray-800">Add Element</h2>
          <p className="text-xs text-gray-500 mt-1">
            {targetParentId 
              ? `Adding child to parent: ${targetParentId.slice(0,8)}` 
              : "Adding new root element"}
          </p>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* Element Type */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Element Type
            </label>
            <select
              className="w-full border rounded px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={elementType}
              onChange={(e) => setElementType(e.target.value)}
            >
              <option value="div">Container (div)</option>
              <option value="section">Section</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="p">Paragraph</option>
              <option value="span">Text Span</option>
              <option value="button">Button</option>
              <option value="img">Image</option>
            </select>
          </div>

          {/* ID */}
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ID (Optional)</label>
                <input
                  type="text"
                  placeholder="my-element"
                  value={elementId}
                  onChange={(e) => setElementId(e.target.value)}
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-sm"
                />
             </div>
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Classes</label>
                <input
                  type="text"
                  placeholder="p-4 bg-red-500"
                  value={classes}
                  onChange={(e) => setClasses(e.target.value)}
                  className="w-full border rounded px-3 py-2 bg-gray-50 text-sm"
                />
             </div>
          </div>

          {/* Content */}
          {elementType !== "img" && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Text Content</label>
              <textarea
                placeholder="Enter inner text..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border rounded px-3 py-2 h-20 bg-gray-50 text-sm resize-none"
              ></textarea>
            </div>
          )}

          {/* Image Source */}
          {elementType === "img" && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Image URL
              </label>
              <input
                type="text"
                placeholder="https://..."
                value={imgSrc}
                onChange={(e) => setImgSrc(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-gray-50 text-sm"
              />
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end mt-8 gap-3">
          <button
            onClick={() => setShowCreateElementContext(false)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded shadow-md transition-all transform active:scale-95"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}