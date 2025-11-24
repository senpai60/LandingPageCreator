import React, { useState, useEffect } from "react";
import { useElementContext } from "../../context/ElementCreateContext"; 
import {defaultStyle} from "../../utils/generateDefaultStyle"

export default function ElementCreateContext({ setShowCreateElementContext }) {
  const { addElement, elements } = useElementContext(); // CONTEXT METHOD

  const [elementType, setElementType] = useState("div");
  const [elementId, setElementId] = useState("");
  const [classes, setClasses] = useState("");
  const [content, setContent] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  // HANDLE CREATE ELEMENT
  const handleCreate = () => {
    const genStyles = defaultStyle(elementType)
    console.log(`creation sn0.=> ${elements.length + 1}`);
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

    addElement(newElement); 

    setShowCreateElementContext(false); // CLOSE POPUP
  };

  useEffect(() => {
    console.log("Updated Elements: ", elements);
  }, [elements]);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl rounded-xl w-[420px] p-6 border">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Create New Element</h2>

        {/* FORM */}
        <div className="space-y-4">
          {/* Element Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Element Type
            </label>
            <select
              className="w-full border rounded px-3 py-2 bg-gray-50"
              value={elementType}
              onChange={(e) => setElementType(e.target.value)}
            >
              <option value="div">div</option>
              <option value="p">p</option>
              <option value="h1">h1</option>
              <option value="h2">h2</option>
              <option value="img">img</option>
              <option value="button">button</option>
              <option value="section">section</option>
              <option value="span">span</option>
            </select>
          </div>

          {/* ID */}
          <div>
            <label className="block text-sm font-medium mb-1">ID</label>
            <input
              type="text"
              placeholder="optional-id"
              value={elementId}
              onChange={(e) => setElementId(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-gray-50"
            />
          </div>

          {/* Classes */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Classes (space separated)
            </label>
            <input
              type="text"
              placeholder="bg-red-500 p-4 text-center"
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
              className="w-full border rounded px-3 py-2 bg-gray-50"
            />
          </div>

          {/* Content */}
          {elementType !== "img" && (
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                placeholder="Inner text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border rounded px-3 py-2 h-20 bg-gray-50"
              ></textarea>
            </div>
          )}

          {/* Image Source */}
          {elementType === "img" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Image Source
              </label>
              <input
                type="text"
                placeholder="https://example.com/img.png"
                value={imgSrc}
                onChange={(e) => setImgSrc(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-gray-50"
              />
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end mt-6 gap-2">
          <button
            onClick={() => setShowCreateElementContext(false)}
            className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Create Element
          </button>
        </div>
      </div>
    </div>
  );
}
