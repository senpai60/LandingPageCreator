import ElementCreateContext from "./layout/ElementCreateContext";
import { useElementContext } from "../context/ElementCreateContext";
import { useEffect, useState } from "react";
import { renderElement } from "../utils/renderElement";

export default function Canvas({
  showCreateElementContext,
  setShowCreateElementContext,
}) {
  const { elements } = useElementContext();

  

  return (
    <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
      {showCreateElementContext && (
        <ElementCreateContext
          setShowCreateElementContext={setShowCreateElementContext}
        />
      )}

      <div
        id="canvas"
        className="min-h-[600px] bg-white border rounded-lg shadow-sm p-6"
      >
        {elements.length === 0 ? (
          <p className="text-gray-500 text-center mt-40">
            Drag & drop components here to build your landing page
          </p>
        ) : (
          elements.map((el) => renderElement(el))
        )}
      </div>
    </main>
  );
}
